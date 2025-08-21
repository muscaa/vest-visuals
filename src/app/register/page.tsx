"use client";

import { Main } from "@/components/main";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { client_config } from "@/utils/client/config";
import { RegisterCard } from "@/components/cards/register";

export default function Page() {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={client_config.env.RECAPTCHA_KEY_SITE}
        >
            <Main>
                <div className="flex flex-col justify-center items-center size-full p-8">
                    <RegisterCard />
                </div>
            </Main>
        </GoogleReCaptchaProvider>
    );
}
