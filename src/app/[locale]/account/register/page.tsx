"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { clientConfig } from "@client/config";
import { RegisterCard } from "@/components/cards/register";
import { Main } from "@/components/main";

export default function Page() {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={clientConfig.env.RECAPTCHA_KEY_SITE}
        >
            <Main className="justify-center items-center p-8">
                <RegisterCard />
            </Main>
        </GoogleReCaptchaProvider>
    );
}
