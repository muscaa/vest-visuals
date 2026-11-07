import { cn } from "@shared/shadcn/utils";
import { Card, CardContent } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { TextH1, TextP } from "@/components/typography";

interface SplitCardProps {
    /** main side, usually a form */
    children?: React.ReactNode;
    /** illustration side, hidden on small screens */
    aside?: React.ReactNode;
    /** small print under the card */
    footer?: React.ReactNode;
    className?: string;
}

/** Card split in a content side and an illustration side, based on shadcn's login-04 block. */
export function SplitCard(props: SplitCardProps) {
    return (
        <div className={cn("flex flex-col gap-6 w-full max-w-sm md:max-w-4xl", props.className)}>
            <Card className="p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="flex flex-col justify-center p-6 md:p-8">
                        {props.children}
                    </div>
                    <div className="hidden md:flex justify-center items-center p-8 bg-muted">
                        {props.aside}
                    </div>
                </CardContent>
            </Card>
            {
                props.footer && (
                    <FieldDescription className="px-6 text-center">
                        {props.footer}
                    </FieldDescription>
                )
            }
        </div>
    );
}

/** The page's title and a short description, at the top of the card's main side. */
export function SplitCardHeader(props: { title: string; description: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center gap-2 text-center">
            <TextH1 size="md-2">{props.title}</TextH1>
            <TextP variant="muted" className="text-balance">
                {props.description}
            </TextP>
        </div>
    );
}
