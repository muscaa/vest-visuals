import { Separator } from "@/components/ui/separator";

interface Props {

}

export function ContactSection(props: Props) {
    return (
        <section id="contact" className="flex flex-col justify-center items-center px-6 py-16">
            <div className="grid grid-cols-2 gap-16 max-w-7xl w-full">
                <div className="flex flex-col">
                    <div className="flex items-center gap-4 text-label font-mono uppercase text-muted-foreground mb-10">
                        <span>06</span>
                        <Separator className="shrink" />
                        <span>Contact</span>
                    </div>
                    <p className="text-stat text-balance mb-4">
                        Tell us what you're
                        <br />
                        building.
                    </p>
                    <p className="text-muted-foreground text-pretty max-w-[42ch] mb-14">
                        We reply within one business day. If it's a fit, we'll suggest a 30-minute discovery call; if not, we'll point you somewhere good.
                    </p>
                    <div className="flex gap-8">
                        {
                            [
                                {
                                    t: "Email",
                                    s: "contact@vestvisuals.ro",
                                },
                                {
                                    t: "Tel",
                                    s: "+40 723 971 618",
                                },
                                {
                                    t: "Office",
                                    s: "Timisoara, Romania",
                                },
                            ].map(({ t, s }, index) => (
                                <div key={index} className="flex flex-col">
                                    <span className="text-label font-mono uppercase text-muted-foreground">{t}</span>
                                    <span className="font-medium">{s}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="bg-black/20">

                </div>
            </div>
        </section>
    );
}
