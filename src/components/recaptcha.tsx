"use client";

import { cn } from "@shared/shadcn/lib/utils";
import { clientConfig } from "@client/config";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ShieldCheck } from "lucide-react";

interface ProviderProps {
    children?: React.ReactNode;
}

export function ReCaptchaProvider(props: ProviderProps) {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={clientConfig.env.RECAPTCHA_KEY_SITE}
        >
            {props.children}
        </GoogleReCaptchaProvider>
    );
}

interface BadgeProps {
    className?: string;
}

export function ReCaptchaBadge(props: BadgeProps) {
    return (
        <div className={cn("flex flex-col", props.className)}>
            <span className="text-center inline">
                <ShieldCheck className="size-6 inline align-middle mr-1" />
                Protected by reCAPTCHA
            </span>
            {/* TODO: add links */}
        </div>
    );
}
