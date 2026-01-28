import { NavbarLayoutProvider } from "@/components/layout/providers/navbar";

export default function Page() {
    return (
        <NavbarLayoutProvider>
            <div className="flex flex-col justify-center items-center h-full gap-4">
                <h1>404</h1>
                <h3>Ne pare rau, pagina nu a fost gasita.</h3>
            </div>
        </NavbarLayoutProvider>
    );
}
