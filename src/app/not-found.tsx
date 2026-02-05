import { NavbarLayoutProvider } from "@/components/layout/providers/navbar";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
    const t = await getTranslations("Basic");

    return (
        <NavbarLayoutProvider>
            <div className="flex flex-col justify-center items-center text-center gap-8 p-8 w-full min-h-screen-no-nav">
                <h1 className="h0">404</h1>
                <h2>{t("not-found")}</h2>
            </div>
        </NavbarLayoutProvider>
    );
}
