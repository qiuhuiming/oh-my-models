import chalk from "chalk";
import { loadConfig } from "../config/loader";
import { getAgentList, getAgentInfo } from "../utils/agents";
import { formatTable } from "../output/table";
import { formatJson } from "../output/json";
import type { AgentRow } from "../types";

export async function listCommand(options: { json: boolean }): Promise<void> {
  const config = loadConfig();

  const rows: AgentRow[] = [];

  for (const agentName of getAgentList()) {
    const agentInfo = getAgentInfo(agentName);
    const agentConfig = config.agents?.[agentName];

    rows.push({
      agent: agentName,
      model: agentConfig?.model || agentInfo?.defaultModel || "",
      description: agentInfo?.description || ""
    });
  }

  if (options.json) {
    console.log(formatJson(config.agents || {}));
  } else {
    console.log(chalk.bold("\nCurrent Agent Models:\n"));
    console.log(formatTable(rows));
  }
}
