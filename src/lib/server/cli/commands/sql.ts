import { CliCommand } from "../core";
import { libsql } from "@server/db";

export const sql: CliCommand = (program, core) => {
    program
        .command("sql")
        .argument("<string>")
        .action(async (command: string) => {
            try {
                const result = await libsql.execute(command);
                core.out("result: ", result.toJSON());
            } catch (error) {
                core.out((error as Error).message);
            }
        });
};
