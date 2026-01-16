#!/usr/bin/env bun
import { Command } from "commander";
import chalk from "chalk";
import { listCommand } from "./commands/list";
import { updateCommand } from "./commands/update";
import { validateCommand } from "./commands/validate";
import { presetCommand } from "./commands/preset";
import type { UpdateOptions, AgentName } from "./types";
import { getAgentList } from "./utils/agents";

const program = new Command()
  .name("oh-my-models")
  .description("CLI tool to manage agent models in oh-my-opencode")
  .version("0.1.0");

program
  .command("list")
  .description("List current agent models")
  .option("--json", "Output as JSON")
  .action(async (options) => {
    await listCommand({ json: options.json || false });
  });

program
  .command("update [agents...]")
  .description("Update agent models")
  .option("--all", "Update all agents")
  .option("--model <model>", "Model to apply (e.g., anthropic/claude-opus-4.5)")
  .option("--dry-run", "Preview changes without applying")
  .option("--no-backup", "Skip creating backup")
  .action(async (agents, options) => {
    const model = options.model;

    if (!model) {
      console.error(chalk.red("Error: --model is required"));
      console.error(chalk.gray("Example: oh-my-models update oracle --model anthropic/claude-opus-4.5"));
      process.exit(1);
    }

    const agentList = options.all ? getAgentList() : (agents as AgentName[]);

    if (agentList.length === 0) {
      console.error(chalk.red("Error: Specify agents or use --all flag"));
      console.error(chalk.gray("Example: oh-my-models update oracle explore --model anthropic/claude-opus-4.5"));
      console.error(chalk.gray("Example: oh-my-models update --all --model anthropic/claude-opus-4.5"));
      process.exit(1);
    }

    const updateOptions: UpdateOptions = {
      dryRun: options.dryRun || false,
      backup: !options.noBackup
    };

    await updateCommand(agentList, model, updateOptions);
  });

program
  .command("validate")
  .description("Validate configured models")
  .action(async () => {
    await validateCommand();
  });

program
  .command("preset <preset>")
  .description("Apply model preset (free, premium, balanced)")
  .option("--dry-run", "Preview changes without applying")
  .option("--no-backup", "Skip creating backup")
  .action(async (presetName, options) => {
    const validPresets = ["free", "premium", "balanced"];

    if (!validPresets.includes(presetName)) {
      console.error(chalk.red(`Error: Invalid preset '${presetName}'`));
      console.error(chalk.gray("Valid presets: free, premium, balanced"));
      process.exit(1);
    }

    const updateOptions: UpdateOptions = {
      dryRun: options.dryRun || false,
      backup: !options.noBackup
    };

    await presetCommand(presetName as any, updateOptions);
  });

program.parse();
