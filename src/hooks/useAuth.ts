"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authClient } from "@client/auth";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export function useAuth() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const login = useMutation({
        mutationFn: async (props: { email: string, password: string }) => {
            if (!executeRecaptcha) return;
            const token = await executeRecaptcha("login");

            const { data, error } = await authClient.signIn.email({
                email: props.email,
                password: props.password,
                rememberMe: true,
                fetchOptions: {
                    headers: {
                        "x-captcha-response": token,
                    },
                },
            });
            if (error) throw new Error(error.message);

            if ("twoFactorRedirect" in data) {
                const { error } = await authClient.twoFactor.sendOtp();
                if (error) throw new Error(error.message);

                router.push("/login/verify");
            } else {
                await queryClient.invalidateQueries({ queryKey: ["profile"] });
                router.push("/account");
            }
        },
    });

    const loginVerify = useMutation({
        mutationFn: async (code: string) => {
            const { error } = await authClient.twoFactor.verifyOtp({
                code,
                trustDevice: true,
            });
            if (error) throw new Error(error.message);

            await queryClient.invalidateQueries({ queryKey: ["profile"] });
            router.push("/account");
        },
    });

    const register = useMutation({
        mutationFn: async (props: { email: string, password: string }) => {
            if (!executeRecaptcha) return;
            const token = await executeRecaptcha("register");

            const { error } = await authClient.signUp.email({
                email: props.email,
                password: props.password,
                name: props.email.split("@")[0],
                fetchOptions: {
                    headers: {
                        "x-captcha-response": token,
                    },
                },
            });
            if (error) throw new Error(error.message);

            router.push("/login");
        },
    });

    const logout = useMutation({
        mutationFn: async () => {
            const { error } = await authClient.signOut();
            if (error) throw new Error(error.message);

            await queryClient.invalidateQueries({ queryKey: ["profile"] });
            router.push("/login");
        },
    });

    const useProfile = () => useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const session = await authClient.getSession();

            return session.data?.user;
        },
    });

    const enable2FA = useMutation({
        mutationFn: async (password: string) => {
            const { error } = await authClient.twoFactor.enable({
                password,
            });
            if (error) throw new Error(error.message);

            await queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });

    const disable2FA = useMutation({
        mutationFn: async (password: string) => {
            const { error } = await authClient.twoFactor.disable({
                password,
            });
            if (error) throw new Error(error.message);

            await queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });

    return {
        login,
        loginVerify,
        register,
        logout,
        useProfile,
        enable2FA,
        disable2FA,
    };
}
