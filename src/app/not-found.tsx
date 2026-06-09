import { TextH1, TextH2 } from "@/components/typography";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
    const t = await getTranslations("Basic");

    return (
        <div className="flex flex-col justify-center items-center text-center gap-8 p-8 w-full min-h-screen-no-nav">
            <TextH1 size="display">404</TextH1>
            <TextH2>{t("not-found")}</TextH2>
        </div>
    );
}
