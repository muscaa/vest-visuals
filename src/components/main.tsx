import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

interface MainProps {
    children: React.ReactNode;
}

export function Main(props: MainProps) {
    return (
        <>
            <Navbar />
            <div className="flex flex-col h-full max-h-full overflow-y-auto">
                <main className="flex-grow">
                    {props.children}
                </main>
                <Footer />
            </div>
        </>
    );
}
