import chalk from "chalk";
import { loadConfig } from "../config/loader";
import { getAgentList, getAgentInfo } from "../utils/agents";
import { validateModel } from "../utils/models";
import { formatValidation } from "../output/table";
import type { ValidationResult } from "../types";

export async function validateCommand(): Promise<void> {
  const config = loadConfig();

  if (!config.agents || Object.keys(config.agents).length === 0) {
    console.log(chalk.yellow("No agent models configured"));
    return;
  }

  const results: ValidationResult[] = [];

  for (const [agentName, agentConfig] of Object.entries(config.agents)) {
    if (!agentConfig?.model) {
      results.push({
        agent: agentName,
        model: "Not set",
        valid: false,
        error: "Model not configured"
      });
      continue;
    }

    const validation = validateModel(agentConfig.model);

    results.push({
      agent: agentName,
      model: agentConfig.model,
      valid: validation.valid,
      error: validation.error
    });
  }

  console.log(formatValidation(results));

  const allValid = results.every((r) => r.valid);

  if (allValid) {
    console.log(chalk.green("\n✅ All models are valid"));
  } else {
    console.log(chalk.red("\n❌ Some models are invalid"));
    process.exit(1);
  }
}
