import chalk from "chalk";
import { validateModel } from "../utils/models";
import { loadConfig } from "../config/loader";
import { getAgentList, getAgentInfo, getDefaultModel } from "../utils/agents";
import { saveConfig } from "../config/saver";
import type { UpdateOptions, AgentName } from "../types";
import { AgentNotFoundError, InvalidModelError, ConfigError } from "../errors";

export async function updateCommand(
  agents: string[],
  model: string,
  options: UpdateOptions = {}
): Promise<void> {
  const { dryRun = false } = options;

  if (dryRun) {
    console.log(chalk.yellow("[DRY RUN] Previewing changes...\n"));
  }

  const validation = validateModel(model);
  if (!validation.valid) {
    throw new InvalidModelError(model, validation.error || "Invalid format");
  }

  const config = loadConfig();

  const updates: Record<string, { model: string }> = {};
  const unknownAgents: string[] = [];

  for (const agentName of agents) {
    const agentInfo = getAgentInfo(agentName);
    if (!agentInfo) {
      unknownAgents.push(agentName);
      continue;
    }

    const oldModel = config.agents?.[agentName as AgentName]?.model;

    console.log(`${chalk.blue(agentName)}: ${chalk.gray(agentInfo?.description)}`);
    console.log(`  Old: ${chalk.gray(oldModel)}`);
    console.log(`  New: ${chalk.green(model)}\n`);

    updates[agentName] = { model };
  }

  if (unknownAgents.length > 0) {
    throw new AgentNotFoundError(unknownAgents.join(", "));
  }

  const result = saveConfig({ agents: updates }, options);

  if (!result.success) {
    throw new ConfigError("SAVE_FAILED", `Failed to save: ${result.error}`);
  }

  console.log(chalk.green("\n✅ Successfully updated agent models"));
}
