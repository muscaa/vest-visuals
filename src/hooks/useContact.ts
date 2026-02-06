"use client";

import { useMutation } from "@tanstack/react-query";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { sendContact } from "@/actions/contact";

type ContactProps = {
    name: string;
    email: string;
    message: string;
};

export function useContact() {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const contact = useMutation({
        mutationFn: async (props: ContactProps) => {
            if (!executeRecaptcha) throw new Error("Recaptcha error");
            const token = await executeRecaptcha("contact");

            const [status, result] = await sendContact(token, props.name, props.email, props.message);
            if (status !== "OK") throw new Error(result as string);

            return true;
        },
    });

    return {
        contact,
    };
}
