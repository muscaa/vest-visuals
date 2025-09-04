"use server";

import { libsql } from "@server/db";
import { sendMail } from "@server/mail";

const commands: Record<string, (command: string) => Promise<string>> = {
    sql: handleSql,
    mail: handleMail,
};

export async function actionRunCommand(command: string) {
    const args = command.split(" ");

    for (const [c, func] of Object.entries(commands)) {
        if (args[0] == c) {
            const subcommand = args.splice(1).join(" ");

            return func(subcommand);
        }
    }

    return "Command not found!";
}

async function handleSql(command: string) {
    try {
        const result = await libsql.execute(command);
        return JSON.stringify(result.toJSON());
    } catch (error) {
        return (error as Error).message;
    }
}

async function handleMail(command: string) {
    const info = await sendMail(["muscamihailp@gmail.com"], "something", "something");

    return JSON.stringify(info, null, 2);
}
