"use client";

// import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authClient } from "@client/auth";

export function useAuth() {
    const router = useRouter();
    // const { executeRecaptcha } = useGoogleReCaptcha();

    const login = useMutation({
        mutationKey: ["login"],
        mutationFn: async (props: { email: string, password: string }) => {
            // if (!executeRecaptcha) return;

            // const token = await executeRecaptcha("login_form");
            // const { data } = await api_client.post<types_login.PostResponse, types_login.PostRequest>("/auth/login", {
            //     token,
            //     email: props.email,
            //     password: props.password,
            // });

            await authClient.signIn.email({
                email: props.email,
                password: props.password,
                rememberMe: true,
            }, {
                onSuccess: (ctx) => {
                    router.push("/a");
                },
                onError: (ctx) => {
                    throw new Error(ctx.error.message);
                },
            })
        },
    });

    const register = useMutation({
        mutationKey: ["register"],
        mutationFn: async (props: { email: string, password: string }) => {
            await authClient.signUp.email({
                email: props.email,
                password: props.password,
                name: props.email.split("@")[0],
            }, {
                onSuccess: (ctx) => {
                    router.push("/login");
                },
                onError: (ctx) => {
                    throw new Error(ctx.error.message);
                },
            });
        },
    });

    const logout = useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/login");
                    },
                },
            });
        },
    });

    return {
        login,
        register,
        logout,
    };
}
