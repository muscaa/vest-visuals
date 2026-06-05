import { Star } from "lucide-react";
import { InfoCard } from "./info-card";
import { Img } from "./img";
import { CardContent, CardHeader } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Separator } from "./ui/separator";
import { cn } from "@shared/shadcn/lib/utils";
import { TextH3, TextP, TextSpan } from "./typography";

export interface ReviewCardProps {
    name: string;
    description: string;
    score: number;
    image?: string;
    role?: string;
    date?: string;
}

export function ReviewCard(props: ReviewCardProps) {
    return (
        <InfoCard className="w-xs sm:w-md max-w-[calc(100vw-4rem)] h-full">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Img
                        src={props.image || "/placeholder.jpg"}
                        className="size-16 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <TextH3>{props.name}</TextH3>
                        {
                            props.role && (
                                <TextP variant="muted" size="label">{props.role}</TextP>
                            )
                        }
                    </div>
                </div>
                <Separator />
            </CardHeader>
            <CardContent className="flex flex-col grow gap-8">
                <TextP variant="muted" className="grow">{props.description}</TextP>
                <div className="flex flex-wrap justify-between items-center">
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
                    {
                        props.date && (
                            <TextSpan variant="muted" size="label" font="mono1" className="text-right">{props.date}</TextSpan>
                        )
                    }
                </div>
            </CardContent>
        </InfoCard>
    );
}

export interface ReviewCarouselProps {
    reviews: ReviewCardProps[];
    className?: string;
}

export function ReviewCarousel(props: ReviewCarouselProps) {
    return (
        <Carousel
            opts={{
                loop: true,
            }}
            className={cn("max-w-full", props.className)}
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
            <CarouselPrevious variant="transparent" className="left-2" />
            <CarouselNext variant="transparent" className="right-2" />
        </Carousel>
    );
}
