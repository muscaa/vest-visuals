import { useMutation } from "@tanstack/react-query";
import { executeCommand } from "@/actions/cli";

export function useCli() {
    const execute = useMutation({
        mutationFn: async (input: string) => {
            const [status, result] = await executeCommand(input);
            if (status !== "OK") throw new Error(result as string);

            return result;
        },
    });

    return {
        execute,
    };
}
