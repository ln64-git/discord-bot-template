# Discord Bot Template

A minimal, production-ready Discord bot template built with TypeScript and Discord.js v14. Designed to be "plug and play" with minimal setup required.

## ✨ Features

- 🔹 **Dynamic command registration** - Commands are automatically loaded from the commands directory
- 🔹 **TypeScript support** - Full type safety with proper type definitions
- 🔹 **Advanced error handling** - Comprehensive error handling with user-friendly messages
- 🔹 **Flexible deployment** - Guild-specific or global command deployment
- 🔹 **Clean architecture** - Modular, extensible codebase
- 🔹 **Database integration** - MongoDB support with connection pooling
- 🔹 **Docker support** - Ready for containerized deployment
- 🔹 **Setup automation** - Interactive setup script for easy configuration

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)
```bash
# Clone the repository
git clone <your-repo-url>
cd discord-bot-template

# Install dependencies
npm install

# Run the interactive setup
npm run setup

# Start the bot
npm start
```

### Option 2: Manual Setup
```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# Then start the bot
npm start
```

### Option 3: Docker Setup
```bash
# Using Docker Compose (includes MongoDB)
docker-compose up -d

# Or build and run manually
docker build -t discord-bot .
docker run -d --env-file .env discord-bot
```

## 📁 Project Structure

```
src/
├── Bot.ts                    # Main bot class
├── main.ts                   # Entry point
├── config/                   # Configuration system
│   └── index.ts
├── commands/                 # Command files
│   └── ping.ts              # Basic ping command
├── types/                   # TypeScript type definitions
│   └── index.ts
└── utils/                   # Utility functions
    ├── database.ts          # Database connection
    └── loadCommands.ts      # Command loader

scripts/
└── setup.js                # Interactive setup script

docs/                       # Documentation
├── SYNC_COMMAND_README.md
└── USER_TRACKING_README.md

data/                       # Runtime data (gitignored)
└── logs/                   # Log files
```

## Adding Commands

Commands are automatically loaded from the `src/commands/` directory. Here's how to create a new command:

```typescript
import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../types';

export const myCommand: Command = {
    data: new SlashCommandBuilder()
        .setName('mycommand')
        .setDescription('My awesome command!'),
    
    async execute(interaction) {
        await interaction.reply('🔹 Hello from my command!');
    }
};
```

## Development

### Running in development mode:
```bash
npm run dev
```

### Building:
```bash
npm run build
```

### Cleaning build artifacts:
```bash
npm run clean
```

## Environment Variables

- `BOT_TOKEN` (required): Your Discord bot token
- `GUILD_ID` (optional): Guild ID for testing commands locally
- `MONGO_URI` (optional): MongoDB connection string for database features

## Getting Started with Discord

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to "Bot" section and create a bot
4. Copy the token and add it to your `.env` file
5. In "OAuth2" > "URL Generator", select "bot" and "applications.commands" scopes
6. Select necessary permissions and use the generated URL to invite your bot

## Documentation

- [Sync Commands](docs/SYNC_COMMAND_README.md) - Database synchronization features
- [User Tracking](docs/USER_TRACKING_README.md) - User and message tracking system

## License

MIT
