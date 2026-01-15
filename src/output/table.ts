import chalk from "chalk";
import Table from "cli-table3";
import type { AgentRow, ValidationResult } from "../types";

export function formatTable(rows: AgentRow[]): string {
  const table = new Table({
    head: [chalk.cyan("Agent"), chalk.cyan("Current Model"), chalk.cyan("Description")],
    colWidths: [25, 35, 20],
    style: {
      head: [],
      border: ["grey"]
    }
  });

  for (const row of rows) {
    const model = row.model || chalk.yellow("Not set");
    table.push([row.agent, model, row.description]);
  }

  return table.toString();
}

export function formatValidation(results: ValidationResult[]): string {
  let output = "\n";

  for (const result of results) {
    const icon = result.valid ? chalk.green("✅") : chalk.red("❌");
    const model = result.model || chalk.yellow("Not set");

    if (result.valid) {
      output += `${icon} ${chalk.bold(result.agent)}: ${model} (valid)\n`;
    } else {
      output += `${icon} ${chalk.bold(result.agent)}: ${chalk.red(model)}\n`;
      if (result.error) {
        output += `   ${chalk.red(result.error)}\n`;
      }
    }
  }

  return output;
}
