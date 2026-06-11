"use client";

import { ReCaptchaProvider } from "@/components/providers/recaptcha";
import { SectionContact } from "@/components/sections/contact";

export default function Page() {
    return (
        <ReCaptchaProvider>
            <SectionContact className="min-h-screen-no-nav" />
        </ReCaptchaProvider>
    );
}
