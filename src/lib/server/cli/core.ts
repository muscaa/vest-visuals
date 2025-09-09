import { Command } from "commander";

export type CliCommand = (program: Command, core: CliCore) => void;

export class CliCore {
    output: string[] = [];

    out(format: any, ...args: any[]) {
        const line = args.map((arg) => JSON.stringify(arg, null, 2)).join("");
        this.output.push(String(format) + line);
    }
}
