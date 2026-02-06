import { cn } from "@shared/shadcn/lib/utils";
import { InfoCard } from "../info-card";

interface TestimonialsCardProps {

}

function TestimonialsCard(props: TestimonialsCardProps) {
    return (
        <InfoCard>

        </InfoCard>
    );
}

interface Props {
    className?: string;
}

export function SectionTestimonials(props: Props) {
    return (
        <section
            id="testimonials"
            className={cn("flex flex-col justify-center items-center gap-8 p-8 w-full", props.className)}
        >
            <TestimonialsCard>
            </TestimonialsCard>
            <TestimonialsCard>
            </TestimonialsCard>
            <TestimonialsCard>
            </TestimonialsCard>
        </section>
    );
}
