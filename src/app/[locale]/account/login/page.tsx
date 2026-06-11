"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { clientConfig } from "@client/config";
import { LoginCard } from "@/components/cards/login";
import { Main } from "@/components/main";

export default function Page() {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={clientConfig.env.RECAPTCHA_KEY_SITE}
        >
            <Main className="justify-center items-center p-8">
                <LoginCard />
            </Main>
        </GoogleReCaptchaProvider>
    );
}
