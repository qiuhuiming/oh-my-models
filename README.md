# oh-my-models

CLI tool to manage agent models in [oh-my-opencode](https://github.com/code-yeongyu/oh-my-opencode).

## Features

- List current agent models (pretty tables or JSON)
- Update single or multiple agents
- Validate model names
- Apply presets (free, premium, balanced)
- Dry-run changes
- Automatic backups with timestamps

## Installation

```bash
# Run directly from GitHub (no install needed)
bunx github:qiuhuiming/oh-my-models list

# Or clone and install locally
git clone https://github.com/qiuhuiming/oh-my-models
cd oh-my-models
bun install
bun link oh-my-models
```

After `bun link oh-my-models`, you can use the shorter `oh-my-models` command shown in the examples below.

## Usage

### List Models

```bash
# Pretty table (default)
oh-my-models list

# JSON output
oh-my-models list --json
```

### Update Models

```bash
# Single agent
oh-my-models update oracle --model "openai/gpt-5.2"

# Multiple agents
oh-my-models update oracle explore --model "anthropic/claude-3"

# All agents
oh-my-models update --all --model "opencode/glm-4.7-free"

# Dry run (preview changes)
oh-my-models update oracle --model "openai/gpt-5.2" --dry-run
```

### Validate

```bash
oh-my-models validate
```

### Presets

```bash
# Free tier (all agents use free models)
oh-my-models preset free

# Premium tier (high-quality models)
oh-my-models preset premium

# Balanced tier (mix of quality and cost)
oh-my-models preset balanced

# Dry run
oh-my-models preset free --dry-run
```

## Config Location

- User config: `~/.config/opencode/oh-my-opencode.json`
- Backups: `~/.config/opencode/oh-my-opencode.json.backup.*`

## License

MIT
