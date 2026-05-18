"use client";

import { OTPCard } from "@/components/cards/otp";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {
    const { loginVerify } = useAuth();

    const handleSubmit = async (code: string) => {
        await loginVerify.mutateAsync(code);
    };

    return (
        <div className="flex flex-col justify-center items-center size-full p-8 min-h-screen-no-nav">
            <OTPCard
                onSubmit={handleSubmit}
            />
        </div>
    );
}
