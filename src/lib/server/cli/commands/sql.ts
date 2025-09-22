import { CliCommand } from "../core";
import { libsql } from "@server/db";

interface Shortcut {
    command: string;
    process?: (result: any) => any;
}

const shortcuts: Record<string, Shortcut> = {
    tables: {
        command: "SELECT name FROM sqlite_master WHERE type='table';",
        process: (result) => {
            const rows = result.rows as [string][];

            return rows.flatMap((row) => row[0]);
        },
    },
};

export const sql: CliCommand = (program, core) => {
    program
        .command("sql")
        .argument("<string>")
        .action(async (command: string, options) => {
            let shortcut: Shortcut | undefined;

            if (command.startsWith(".")) {
                shortcut = shortcuts[command.substring(1)];
                if (!shortcut) throw new Error("Unknown shortcut");

                command = shortcut.command;
            }

            const result = await libsql.execute(command);
            const json = shortcut && shortcut.process ? shortcut.process(result) : result.toJSON();
            core.out(json);
        });
};
