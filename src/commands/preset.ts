import chalk from "chalk";
import { loadConfig } from "../config/loader";
import { getAgentList, getAgentInfo, getDefaultModel } from "../utils/agents";
import { saveConfig } from "../config/saver";
import type { UpdateOptions } from "../types";
import { FREE_PRESET } from "../presets/free";
import { PREMIUM_PRESET } from "../presets/premium";
import { BALANCED_PRESET } from "../presets/balanced";

type PresetName = "free" | "premium" | "balanced";

const PRESETS: Record<PresetName, Record<string, { model: string }>> = {
  free: FREE_PRESET,
  premium: PREMIUM_PRESET,
  balanced: BALANCED_PRESET
};

export async function presetCommand(
  presetName: PresetName,
  options: UpdateOptions = {}
): Promise<void> {
  const { dryRun = false } = options;

  if (dryRun) {
    console.log(chalk.yellow("[DRY RUN] Previewing preset changes...\n"));
  }

  const config = loadConfig();
  const preset = PRESETS[presetName];

  if (!preset) {
    console.error(chalk.red(`Unknown preset: ${presetName}`));
    console.error(chalk.gray("Available presets: free, premium, balanced"));
    process.exit(1);
  }

  console.log(chalk.bold(`\nApplying ${chalk.cyan(presetName)} preset:\n`));

  for (const agentName of getAgentList()) {
    const agentInfo = getAgentInfo(agentName);
    const presetModel = preset[agentName]?.model;
    const currentModel = config.agents?.[agentName]?.model;
    const defaultModel = getDefaultModel(agentName);

    if (!presetModel) {
      continue;
    }

    const isChange = currentModel !== presetModel;

    if (isChange || dryRun) {
      console.log(`${chalk.blue(agentName)}: ${chalk.gray(agentInfo?.description)}`);
      console.log(`  Current: ${chalk.gray(currentModel || defaultModel || "default")}`);
      console.log(`  Preset: ${chalk.green(presetModel)}\n`);
    }
  }

  const result = saveConfig({ agents: preset }, options);

  if (!result.success) {
    console.error(chalk.red(`Failed to apply preset: ${result.error}`));
    process.exit(1);
  }

  console.log(chalk.green(`\n✅ Applied ${presetName} preset`));
}
