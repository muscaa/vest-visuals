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

}

export function SectionTestimonials(props: Props) {
    return (
        <section id="testimonials" className="flex justify-center items-center gap-8 px-2 py-16">
            <TestimonialsCard>
            </TestimonialsCard>
            <TestimonialsCard>
            </TestimonialsCard>
            <TestimonialsCard>
            </TestimonialsCard>
        </section>
    );
}
