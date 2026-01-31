import { NavbarLayoutProvider } from "@/components/layout/providers/navbar";

export default function Page() {
    return (
        <NavbarLayoutProvider>
            <div className="flex flex-col justify-center items-center text-center h-full gap-4">
                <h1 className="h0">404</h1>
                <h2>Ne pare rau, pagina nu a fost gasita</h2>
            </div>
        </NavbarLayoutProvider>
    );
}
