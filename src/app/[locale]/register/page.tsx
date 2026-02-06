"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { clientConfig } from "@client/config";
import { RegisterCard } from "@/components/cards/register";

export default function Page() {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={clientConfig.env.RECAPTCHA_KEY_SITE}
        >
            <div className="flex flex-col justify-center items-center size-full p-8 min-h-screen-no-nav">
                <RegisterCard />
            </div>
        </GoogleReCaptchaProvider>
    );
}
