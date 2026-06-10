"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    getCookie,
    setCookie,
} from "@client/cookies";
import {
    parseCookie,
    COOKIE_CONSENT,
} from "@shared/cookies";

export function useCookies() {
    const queryClient = useQueryClient();

    const useConsent = () => useQuery({
        queryKey: [COOKIE_CONSENT.name],
        queryFn: async () => {
            const value = getCookie(COOKIE_CONSENT.name);

            return parseCookie(COOKIE_CONSENT, value) ?? null;
        },
    });

    const consent = useMutation({
        mutationFn: async (value: typeof COOKIE_CONSENT.value[number] | undefined) => {
            setCookie(COOKIE_CONSENT.name, value, { expiresIn: { months: 6 } });

            await queryClient.invalidateQueries({ queryKey: [COOKIE_CONSENT.name] });
        },
    });

    return {
        useConsent,
        consent
    };
}
