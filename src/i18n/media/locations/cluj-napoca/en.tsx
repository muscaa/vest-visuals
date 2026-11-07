import type { LocationContent } from "@/components/media/location";

const content: LocationContent = {
    inCity: "in Cluj-Napoca",
    description: "Cluj-Napoca has it all: a historic centre, parks and hills overlooking the city. We come for weddings, events, photo sessions and business projects.",
    spots: [
        {
            name: "Union Square (Piața Unirii)",
            description: "St. Michael's Church and the statue of Matthias Corvinus, in the heart of the old town.",
        },
        {
            name: "Central Park and the Casino",
            description: "The lake, the paths and the Casino building, a classic spot for couple sessions.",
        },
        {
            name: "Botanical Garden",
            description: "One of the most beautiful botanical gardens in Romania, with greenhouses, a Japanese garden and lots of greenery.",
        },
        {
            name: "Cetățuia Hill",
            description: "The hill above the city, with the best view over Cluj, especially at sunset.",
        },
        {
            name: "Museum Square",
            description: "A small, quiet square with old buildings and cobbled streets.",
        },
    ],
    faq: [
        {
            question: "Do you travel to weddings in Cluj-Napoca?",
            answer: "Yes. We travel from Timișoara, and include the cost of travel and accommodation openly in the offer.",
        },
        {
            question: "How much does a photographer in Cluj-Napoca cost?",
            answer: "We start from the same prices as in Timișoara, plus the cost of travel. Every client gets a personalised offer.",
        },
        {
            question: "Which locations do you recommend for photo sessions in Cluj?",
            answer: "Central Park, Cetățuia Hill at sunset and the Botanical Garden are our favourites.",
        },
        {
            question: "How early should we book?",
            answer: "For events outside Timișoara we recommend at least 3-6 months, so we can plan the trip.",
        },
    ],
};

export default content;
