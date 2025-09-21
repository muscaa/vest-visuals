"use client";

import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "@type/auth";
import { authClient } from "@client/auth";

export interface AuthContext {
    profile?: Profile;
}

export const Auth = createContext<AuthContext>({});

interface AuthContextProviderProps {
    children: React.ReactNode;
}

export function AuthContextProvider(props: AuthContextProviderProps) {
    const { data } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const session = await authClient.getSession();

            return session.data?.user;
        },
    });

    return (
        <Auth.Provider
            value={{
                profile: data,
            }}
        >
            {props.children}
        </Auth.Provider>
    );
}
