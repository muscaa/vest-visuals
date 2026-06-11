"use client";

import { ContactPage } from "@/components/pages/contact";
import { ReCaptchaProvider } from "@/components/providers/recaptcha";

export default function Page() {
    return (
        <ReCaptchaProvider>
            <ContactPage />
        </ReCaptchaProvider>
    );
}
