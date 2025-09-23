import { createRegistry } from "..";
import { TeamRegistry } from "@type/registries/team";

export const team: TeamRegistry = await createRegistry("team", {
    members: [],
});
