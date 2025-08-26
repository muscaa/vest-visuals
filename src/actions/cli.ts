"use server";

import { libsql } from "@server/db";

export async function actionRunCommand(command: string) {
    try {
        const result = await libsql.execute(command);
        return JSON.stringify(result.toJSON());
    } catch (error) {
        return (error as Error).message;
    }
}
