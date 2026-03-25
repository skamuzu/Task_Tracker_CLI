# Task Tracker CLI

A simple command-line interface (CLI) tool for managing your tasks efficiently. Built with TypeScript and Node.js, this tool allows you to create, update, delete, and organize tasks with different statuses.

## Features

- ✅ **Add Tasks** - Create new tasks with descriptions
- ✏️ **Update Tasks** - Modify task descriptions
- 🗑️ **Delete Tasks** - Remove tasks you no longer need
- 📋 **List Tasks** - View all tasks or filter by status (todo, in-progress, done)
- 🔄 **Mark Status** - Change task status to in-progress or done
- 💾 **Persistent Storage** - Tasks are saved locally in JSON format

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/skamuzu/Task_Tracker_CLI.git
cd Task_Tracker_CLI
```

### 2. Install Dependencies

```bash
npm install
```

This will install the required dependencies:
- `typescript` - TypeScript compiler
- `tsx` - Execute TypeScript files directly
- `@types/node` - Type definitions for Node.js

### 3. Link the CLI Globally

Create a symlink to use the CLI command globally:

```bash
npm link
```

This allows you to use the `taskcli` command from anywhere in your terminal.

### 4. Verify Installation

To verify that everything is set up correctly, run:

```bash
taskcli list
```

You should see the CLI output showing the available tasks (or an empty list if this is your first run).

## Usage

The CLI uses the following command structure:

```bash
taskcli <command> [arguments]
```

### Available Commands

#### Add a Task
```bash
taskcli add "Your task description"
```

Example:
```bash
taskcli add "Complete project documentation"
```

#### List All Tasks
```bash
taskcli list
```

#### List Tasks by Status
```bash
taskcli list <status>
```

Available statuses: `todo`, `in-progress`, `done`

Examples:
```bash
taskcli list todo
taskcli list in-progress
taskcli list done
```

#### Update Task Description
```bash
taskcli update <task-id> "New description"
```

Example:
```bash
taskcli update 1 "Updated task description"
```

#### Mark Task as In-Progress
```bash
taskcli mark-in-progress <task-id>
```

Example:
```bash
taskcli mark-in-progress 1
```

#### Mark Task as Done
```bash
taskcli mark-done <task-id>
```

Example:
```bash
taskcli mark-done 1
```

#### Delete a Task
```bash
taskcli delete <task-id>
```

Example:
```bash
taskcli delete 1
```

## Project Structure

```
Task_Tracker_CLI/
├── index.ts           # Main application file
├── tasks.json         # Local task storage (auto-created)
├── package.json       # Project configuration and dependencies
├── tsconfig.json      # TypeScript configuration
├── README.md          # This file
└── node_modules/      # Installed dependencies
```

## Development

### Running TypeScript Files

This project uses `tsx` to run TypeScript files directly without compilation:

```bash
node index.ts <command>
```

### Building (Optional)

To compile TypeScript to JavaScript:

```bash
npx tsc
```

This will generate compiled JavaScript files and source maps based on the `tsconfig.json` configuration.

## How It Works

- **Storage**: Tasks are stored in a `tasks.json` file in the project root directory
- **Task Structure**: Each task contains:
  - `id`: Unique identifier
  - `description`: Task description
  - `status`: Current status (todo, in-progress, done)
  - `createdAt`: Creation timestamp
  - `updatedAt`: Last update timestamp

## License

This project is licensed under the ISC License. See the `package.json` file for details.

## Repository

GitHub: https://github.com/skamuzu/Task_Tracker_CLI

## Troubleshooting

### "command not found" error
Make sure you have Node.js installed and you're running the command from the project root directory.

### Tasks not persisting
Ensure you have write permissions in the project directory. The `tasks.json` file should be created automatically on first run.

### TypeScript errors
Make sure all dependencies are installed by running `npm install`.
