import { cn } from "@shared/shadcn/lib/utils";
import { InfoCard } from "../info-card";
import { Img } from "../snippets";
import {
    CardContent,
    CardHeader,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

interface ReviewCardProps {
    name: string;
    image: string;
    date: string;
    score: number;
    description: string;
}

function ReviewCard(props: ReviewCardProps) {
    return (
        <InfoCard className="w-xs sm:w-md">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Img
                        src={props.image}
                        className="size-16 rounded-full"
                    />
                    <h3>{props.name}</h3>
                </div>
                <Separator />
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
                <p>{props.description}</p>
                <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                        {
                            Array.from({ length: props.score }).map((_, index) => (
                                <Star key={index} fill="var(--success)" className="text-success" />
                            ))
                        }
                        {
                            Array.from({ length: 5 - props.score }).map((_, index) => (
                                <Star key={index} className="text-success" />
                            ))
                        }
                    </div>
                    <span className="text-muted-foreground h5">{props.date}</span>
                </div>
            </CardContent>
        </InfoCard>
    );
}

export interface SectionTestimonialsProps {
    title: string;
    reviews: ReviewCardProps[];
    className?: string;
}

export function SectionTestimonials(props: SectionTestimonialsProps) {
    return (
        <section
            id="testimonials"
            className={cn("flex flex-col justify-center items-center gap-8 w-full", props.className)}
        >
            <h2 className="font-mono text-center my-8">{props.title}</h2>
            <Carousel
                opts={{
                    loop: true,
                }}
                className="max-w-6xl w-full bg-red-500"
            >
                <CarouselContent className="py-8">
                    {
                        props.reviews.map((review, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-auto"
                            >
                                <ReviewCard
                                    {...review}
                                />
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                {/* <CarouselPrevious variant="transparent" /> */}
                {/* <CarouselNext variant="transparent" /> */}
            </Carousel>
        </section>
    );
}
