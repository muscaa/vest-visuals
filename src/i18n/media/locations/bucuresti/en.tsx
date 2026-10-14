import type { LocationContent } from "@/components/media/location";

const content: LocationContent = {
    inCity: "in Bucharest",
    description: "For weddings, events and bigger projects, we come to Bucharest too. We take care of the whole trip, you just take care of your day.",
    spots: [
        {
            name: "Herăstrău Park",
            description: "The largest park in the city, with a lake, paths and a Japanese garden.",
        },
        {
            name: "The Romanian Athenaeum",
            description: "One of the most beautiful buildings in Bucharest, an elegant backdrop for portraits.",
        },
        {
            name: "The Old Town",
            description: "Cobbled streets, historic buildings and Manuc's Inn, good for city shots.",
        },
        {
            name: "Cișmigiu Gardens",
            description: "The oldest park in the city, with a lake, bridges and old trees.",
        },
        {
            name: "Victory Avenue (Calea Victoriei)",
            description: "The avenue of palaces, museums and historic buildings, perfect for a photo walk.",
        },
    ],
    faq: [
        {
            question: "Do you travel to weddings in Bucharest?",
            answer: "Yes. We travel from Timișoara, and include the cost of travel and accommodation openly in the offer.",
        },
        {
            question: "How much does a photographer in Bucharest cost?",
            answer: "We start from the same prices as in Timișoara, plus the cost of travel and accommodation. Every client gets a personalised offer.",
        },
        {
            question: "Which locations do you recommend for photo sessions in Bucharest?",
            answer: "Herăstrău Park, Cișmigiu Gardens and the Old Town are safe choices. Some buildings, such as the Athenaeum, may need permits, which we can take care of.",
        },
        {
            question: "How early should we book?",
            answer: "For events outside Timișoara we recommend at least 3-6 months, so we can plan the trip.",
        },
    ],
};

export default content;
