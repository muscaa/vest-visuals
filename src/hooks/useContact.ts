import { useMutation } from "@tanstack/react-query";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { apiClient } from "@client/http";
import * as types from "@shared/types/api/contact";

type ContactProps = {
    name: string;
    email: string;
    message: string;
};

export function useContact() {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const contact = useMutation({
        mutationKey: ["contact"],
        mutationFn: async (props: ContactProps) => {
            if (!executeRecaptcha) throw new Error("Recaptcha error");

            const token = await executeRecaptcha("contact_form");

            const { data } = await apiClient.post<types.PostResponse, types.PostRequest>("/contact", {
                token,
                ...props,
            });

            if (!data.success) throw new Error(data.error);

            return data.success;
        },
    });

    return {
        contact,
    };
}
