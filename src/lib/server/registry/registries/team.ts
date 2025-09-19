import { createRegistry } from "..";

interface TeamRegistry {
    something: number;
}

export const team: TeamRegistry = await createRegistry("team", {
    something: 1,
});
