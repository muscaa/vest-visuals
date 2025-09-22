export interface TeamMember {
    name: string;
    image: string;
    roles: string[];
    email: string;
    socials: {
        instagram: string;
        facebook: string;
        linkedin: string;
    };
}

export interface TeamRegistry {
    members: TeamMember[];
}
