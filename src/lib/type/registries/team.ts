import { z } from "zod";

export const TeamMemberSchema = z.object({
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
export type TeamMember = z.infer<typeof TeamMemberSchema>;

export const TeamRegistrySchema = z.object({
    members: z.array(TeamMemberSchema),
});
export type TeamRegistry = z.infer<typeof TeamRegistrySchema>;
