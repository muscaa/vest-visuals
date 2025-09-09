import { Command } from "commander";

export type CliCommand = (program: Command, core: CliCore) => void;

export class CliCore {
    output: string[] = [];

    out(...args: any[]) {
        const types: Record<string, (arg: any) => string> = {
            object: (arg: any) => JSON.stringify(arg, null, 2),
        };

        const line = args.map((arg) => types[typeof arg] ? types[typeof arg](arg) : String(arg)).join("");
        this.output.push(line);
    }
}
