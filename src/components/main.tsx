import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { cn } from "@/utils/shadcn/lib/utils";

interface MainProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
}

export function Main(props: MainProps) {
    return (
        <>
            {
                props.header ?? (
                    <Navbar />
                )
            }
            <div className={cn("flex flex-col max-h-full h-full overflow-y-auto", props.className)}>
                <main className="grow">
                    {props.children}
                </main>
                {
                    props.footer ?? (
                        <Footer />
                    )
                }
            </div>
        </>
    );
}
