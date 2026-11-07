import type { LocationContent } from "@/components/media/location";

const content: LocationContent = {
    inCity: "in Drobeta-Turnu Severin",
    description: "The Danube, its history and the surrounding landscapes make Drobeta-Turnu Severin a special place for photos. We come for weddings, events, photo sessions and business projects.",
    spots: [
        {
            name: "The Water Tower (Castelul de Apă)",
            description: "The water tower in the city centre, the symbol of Severin, with a beautiful view from the top.",
        },
        {
            name: "The Danube riverfront",
            description: "The banks of the Danube, with spectacular sunsets and plenty of open space.",
        },
        {
            name: "Severin Medieval Fortress",
            description: "The fortress ruins, with old stone walls and lots of character.",
        },
        {
            name: "The ruins of Trajan's Bridge",
            description: "The pillars of the Roman bridge next to the Iron Gates Museum, a truly unique spot.",
        },
        {
            name: "Rose Park (Parcul Rozelor)",
            description: "The central park, with flowers and shaded paths, close to the Water Tower.",
        },
    ],
    faq: [
        {
            question: "Do you travel to Drobeta-Turnu Severin?",
            answer: "Yes. We travel from Timișoara, and include the cost of travel and accommodation openly in the offer.",
        },
        {
            question: "How much does a photographer in Drobeta-Turnu Severin cost?",
            answer: "We start from the same prices as in Timișoara, plus the cost of travel. Every client gets a personalised offer.",
        },
        {
            question: "Do you also do photo sessions at the Danube Gorges (Cazanele Dunării)?",
            answer: "Yes, on request. The scenery at the Gorges is spectacular, and we include the trip in the offer.",
        },
        {
            question: "How early should we book?",
            answer: "For events outside Timișoara we recommend at least 3-6 months, so we can plan the trip.",
        },
    ],
};

export default content;
