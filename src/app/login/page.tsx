"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { clientConfig } from "@client/config";
import { LoginCard } from "@/components/cards/login";

export default function Page() {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={clientConfig.env.RECAPTCHA_KEY_SITE}
        >
            <div className="flex flex-col justify-center items-center size-full p-8">
                <LoginCard />
            </div>
        </GoogleReCaptchaProvider>
    );
}
