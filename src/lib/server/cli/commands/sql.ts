import { CliCommand } from "../core";
import { libsql } from "@server/db";

const shortcuts: Record<string, string> = {
    tables: "SELECT name FROM sqlite_master WHERE type='table';",
};

export const sql: CliCommand = (program, core) => {
    program
        .command("sql")
        .argument("<string>")
        .option("-s, --shortcut")
        .action(async (command: string, options) => {
            try {
                if (options.shortcut) {
                    command = shortcuts[command];
                    if (!command) throw new Error("Unknown shortcut");
                }

                const result = await libsql.execute(command);
                core.out("result: ", result.toJSON());
            } catch (error) {
                core.out((error as Error).message);
            }
        });
};
