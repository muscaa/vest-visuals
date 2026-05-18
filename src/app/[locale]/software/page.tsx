"use client";

import { useTranslations } from "next-intl";

export default function Page() {
    const t = useTranslations("Basic");

    return (
        <div>
            hello
            <br />
            {t("not-found")}
        </div>
    );
}
