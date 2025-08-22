"use client";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { api_client } from "@/utils/client/axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as types_login from "@/types/api/auth/login";

export function useAuth() {
    const router = useRouter();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const login = useMutation({
        mutationKey: ["login"],
        mutationFn: async (props: { email: string, password: string }) => {
            if (!executeRecaptcha) return;

            const token = await executeRecaptcha("login_form");
            const { data } = await api_client.post<types_login.PostResponse, types_login.PostRequest>("/auth/login", {
                token,
                email: props.email,
                password: props.password,
            });

            if (data.success) {
                router.replace("/a");
            } else {
                throw new Error(data.message);
            }
        },
    });

    const register = useMutation({
        mutationKey: ["register"],
        mutationFn: async (props: { email: string, password: string }) => {
            // if (!executeRecaptcha) return;

            // const token = await executeRecaptcha("login_form");
            // const { data } = await api_client.post<types_login.PostResponse, types_login.PostRequest>("/auth/login", {
            //     token,
            //     email: props.email,
            //     password: props.password,
            // });

            // if (data.success) {
            //     router.replace("/a");
            // } else {
            //     throw new Error(data.message);
            // }
        },
    });

    const logout = useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            router.replace("/auth/logout");
        },
    });

    return {
        login,
        register,
        logout,
    };
}
