import stringArgv from "string-argv";
import { Command } from "commander";
import { CliCore } from "./core";
import * as commands from "./commands";

export async function execute(input: string): Promise<string[]> {
    const program = new Command();
    const core = new CliCore();

    program
        .exitOverride((err) => {
            throw err;
        })
        .configureOutput({
            writeOut: (str) => core.out(str),
            writeErr: (str) => core.out(str),
        });

    for (const [_, register] of Object.entries(commands)) {
        register(program, core);
    }

    try {
        const args = stringArgv(input);
        await program.parseAsync(args, { from: "user" });
    } catch (error) {
       core.out((error as Error).message);
    }

    return core.output;
}
