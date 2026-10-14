import type { LocationContent } from "@/components/media/location";

const content: LocationContent = {
    inCity: "in Timișoara",
    description: "We're based in Timișoara, so this is home. We photograph weddings, christenings, 18th birthdays, photo sessions, properties and businesses all over the city and the surrounding area, with no travel costs.",
    spots: [
        {
            name: "Rose Park (Parcul Rozelor)",
            description: "Thousands of roses on the banks of the Bega, perfect for couple and wedding photo sessions, especially in May and June.",
        },
        {
            name: "Union Square (Piața Unirii)",
            description: "Colourful baroque buildings and the Roman Catholic Cathedral, a classic backdrop for portraits and city shots.",
        },
        {
            name: "Victory Square and the Metropolitan Cathedral",
            description: "The pedestrian boulevard between the Opera and the Cathedral, with grand architecture and plenty of space.",
        },
        {
            name: "The Bega riverbanks",
            description: "Willow-lined paths, bridges and water, great for relaxed shots at sunset.",
        },
        {
            name: "Theresia Bastion",
            description: "The old brick walls of the fortress give photos a warm, storybook feel.",
        },
        {
            name: "Botanical Park",
            description: "Greenery, quiet paths and secluded corners, good for portraits in natural light.",
        },
    ],
    faq: [
        {
            question: "How much does a photographer in Timișoara cost?",
            answer: "It depends on the service: photo sessions start at €50, 18th birthdays at €250 and weddings at €800. Every client gets a personalised offer, and in Timișoara we don't add travel costs.",
        },
        {
            question: "Which locations do you recommend for photo sessions in Timișoara?",
            answer: "Rose Park, Union Square, the Bega riverbanks and Theresia Bastion are among our favourites. We'll help you choose based on the style you want and the light on the day of the session.",
        },
        {
            question: "Do you also work in the towns around Timișoara?",
            answer: "Yes, in Dumbrăvița, Giroc, Moșnița, Ghiroda and the rest of the metropolitan area, also with no travel costs.",
        },
        {
            question: "How soon can we schedule a photo session?",
            answer: "Usually within one or two weeks. For weddings and big events we recommend writing to us a few months ahead.",
        },
    ],
};

export default content;
