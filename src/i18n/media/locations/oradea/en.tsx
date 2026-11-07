import type { LocationContent } from "@/components/media/location";

const content: LocationContent = {
    inCity: "in Oradea",
    description: "Oradea is one of the most photogenic cities in Romania, with its Art Nouveau buildings. We come for weddings, events, photo sessions and business projects.",
    spots: [
        {
            name: "Union Square (Piața Unirii)",
            description: "The heart of the city, with the Black Eagle Palace, the City Hall and the Moon Church, full of Art Nouveau details.",
        },
        {
            name: "Republicii Street",
            description: "The pedestrian street with colourful, ornate façades, perfect for city shots.",
        },
        {
            name: "Oradea Fortress",
            description: "The star-shaped fortress, with brick walls and spacious inner courtyards.",
        },
        {
            name: "The Crișul Repede riverbanks",
            description: "Bridges and paths along the river, great for walks and sunset shots.",
        },
        {
            name: "Baroque Palace",
            description: "The palace and its park, an elegant and quiet backdrop for portraits.",
        },
    ],
    faq: [
        {
            question: "Do you travel to weddings in Oradea?",
            answer: "Yes. We travel from Timișoara, and include the cost of travel and, if needed, accommodation openly in the offer.",
        },
        {
            question: "How much does a photographer in Oradea cost?",
            answer: "We start from the same prices as in Timișoara, plus the cost of travel. Every client gets a personalised offer.",
        },
        {
            question: "Which locations do you recommend for photo sessions in Oradea?",
            answer: "Union Square, Republicii Street and the Fortress are our favourites, especially for those who love architecture.",
        },
        {
            question: "How early should we book?",
            answer: "For events outside Timișoara we recommend at least 3-6 months, so we can plan the trip.",
        },
    ],
};

export default content;
