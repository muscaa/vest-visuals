"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authClient } from "@client/auth";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
    useMemo,
    useContext,
} from "react";
import { Auth } from "@/contexts/auth";
import {
    LOGIN,
    LOGIN_VERIFY,
    U_ACCOUNT,
} from "@shared/paths";

export function useAuth() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const context = useContext(Auth);

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

                router.push(LOGIN_VERIFY);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["profile"] });
                router.push(U_ACCOUNT);
            }

            return true;
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
            router.push(U_ACCOUNT);

            return true;
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

            router.push(LOGIN);

            return true;
        },
    });

    const logout = useMutation({
        mutationFn: async () => {
            const { error } = await authClient.signOut();
            if (error) throw new Error(error.message);

            await queryClient.invalidateQueries({ queryKey: ["profile"] });
            router.push(LOGIN);

            return true;
        },
    });

    const enable2FA = useMutation({
        mutationFn: async (password: string) => {
            const { error } = await authClient.twoFactor.enable({
                password,
            });
            if (error) throw new Error(error.message);

            await queryClient.invalidateQueries({ queryKey: ["profile"] });

            return true;
        },
    });

    const disable2FA = useMutation({
        mutationFn: async (password: string) => {
            const { error } = await authClient.twoFactor.disable({
                password,
            });
            if (error) throw new Error(error.message);

            await queryClient.invalidateQueries({ queryKey: ["profile"] });

            return true;
        },
    });

    const profile = useMemo(() => context.profile, [context.profile]);
    const isAdmin = useMemo(() => profile?.role === "admin", [profile?.role]);

    return {
        login,
        loginVerify,
        register,
        logout,
        enable2FA,
        disable2FA,
        profile,
        isAdmin,
    };
}
