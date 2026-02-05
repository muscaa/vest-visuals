"use client";

import { ReCaptchaProvider } from "@/components/recaptcha";
import { SectionContact } from "@/components/sections/contact";

export default function Page() {
    return (
        <ReCaptchaProvider>
            <SectionContact className="h-screen-no-nav" />
        </ReCaptchaProvider>
    );
}
