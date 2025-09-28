import { createRegistry } from "..";

export const team_members = await createRegistry("team_members", {
    default: [],
});
