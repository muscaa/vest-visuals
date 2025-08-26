import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { cn } from "@shared/shadcn/lib/utils";

export interface MainProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    extraClassName?: string;
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
                <main className={cn("grow", props.extraClassName)}>
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
