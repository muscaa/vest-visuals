"use client";

import { clientConfig } from "@client/config";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

interface ReCaptchaProviderProps {
    children?: React.ReactNode;
}

export function ReCaptchaProvider(props: ReCaptchaProviderProps) {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={clientConfig.env.RECAPTCHA_KEY_SITE}
        >
            {props.children}
        </GoogleReCaptchaProvider>
    );
}
