import { Client, Collection, GatewayIntentBits, REST, Routes } from "discord.js";
import type { Command } from "./types";
import { loadCommands } from "./utils/loadCommands";

export class Bot {
    public client: Client;
    public commands = new Collection<string, Command>();

    constructor(private token: string) {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
        });
    }

    async init() {
        await this.client.login(this.token);
        await this.deployCommands();
        this.setupEventHandlers();
        console.log(`🔹 Logged in as ${this.client.user?.tag}!`);
    }

    private setupEventHandlers() {
        // Ready event
        this.client.once('ready', () => {
            console.log('🔹 Bot is ready!');
        });

        // Interaction event for slash commands
        this.client.on('interactionCreate', async (interaction) => {
            if (!interaction.isChatInputCommand()) return;

            const command = this.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(`🔸 Error executing command ${interaction.commandName}:`, error);

                const errorMessage = 'There was an error while executing this command!';
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: errorMessage, ephemeral: true });
                } else {
                    await interaction.reply({ content: errorMessage, ephemeral: true });
                }
            }
        });

        // Error handling
        this.client.on('error', (error) => {
            console.error('🔸 Discord client error:', error);
        });
    }

    private async deployCommands() {
        const rest = new REST({ version: "10" }).setToken(this.token);
        const commands = await loadCommands(this.client, this.commands);

        const appId = this.client.application?.id;
        if (!appId) {
            throw new Error("Application ID is missing. Make sure the client is fully logged in.");
        }

        try {
            if (process.env.GUILD_ID) {
                // Fast guild-specific deployment for testing
                await rest.put(
                    Routes.applicationGuildCommands(appId, process.env.GUILD_ID),
                    { body: commands },
                );
                console.log(`✅ Slash commands registered to guild ${process.env.GUILD_ID}.`);
            } else {
                // Global deployment (takes up to an hour)
                await rest.put(
                    Routes.applicationCommands(appId),
                    { body: commands },
                );
                console.log("✅ Global slash commands registered.");
            }
        } catch (error) {
            console.error("❌ Error registering slash commands:", error);
        }
    }
}