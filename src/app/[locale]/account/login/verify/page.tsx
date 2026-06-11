"use client";

import { OTPCard } from "@/components/cards/otp";
import { Main } from "@/components/main";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {
    const { loginVerify } = useAuth();

    const handleSubmit = async (code: string) => {
        await loginVerify.mutateAsync(code);
    };

    return (
        <Main className="justify-center items-center p-8">
            <OTPCard
                onSubmit={handleSubmit}
            />
        </Main>
    );
}
