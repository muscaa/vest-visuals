import { z } from "zod";

export const TeamMember = z.object({
    name: z.string(),
    image: z.string(),
    roles: z.array(z.string()),
    email: z.string(),
    socials: z.object({
        instagram: z.string().optional(),
        facebook: z.string().optional(),
        linkedin: z.string().optional(),
    }),
});
export type TeamMember = z.infer<typeof TeamMember>;

export const TeamMembersRegistry = z.array(TeamMember);
export type TeamMembersRegistry = z.infer<typeof TeamMembersRegistry>;
