import type { LocationContent } from "@/components/media/location";

const content: LocationContent = {
    inCity: "in Arad",
    description: "Arad is less than an hour from us, so we come with no travel costs. We photograph weddings, christenings, 18th birthdays, photo sessions, properties and businesses all over the city and the surrounding area.",
    spots: [
        {
            name: "Palace of Culture",
            description: "One of the most beautiful buildings in western Romania, with eclectic façades and grand staircases.",
        },
        {
            name: "The Mureș riverfront",
            description: "The riverbank, with wide paths, trees and lovely sunsets, good for relaxed shots.",
        },
        {
            name: "Administrative Palace",
            description: "The city hall building, with its tower and imposing architecture, an elegant backdrop for portraits.",
        },
        {
            name: "Revolution Boulevard",
            description: "The main boulevard, with historic buildings, the Classical Theatre and the Roman Catholic Cathedral.",
        },
        {
            name: "Eminescu Park",
            description: "A quiet park with greenery and shaded paths, close to the centre.",
        },
    ],
    faq: [
        {
            question: "How much does a photographer in Arad cost?",
            answer: "The same as in Timișoara: photo sessions start at €50, 18th birthdays at €250 and weddings at €800. For Arad we don't add travel costs.",
        },
        {
            question: "Do you travel to weddings in Arad?",
            answer: "Yes, often. Arad is less than an hour from Timișoara, so for us it's like home.",
        },
        {
            question: "Which locations do you recommend for photo sessions in Arad?",
            answer: "The Palace of Culture, the Mureș riverfront and Revolution Boulevard are safe choices. We'll help you choose based on the style you want.",
        },
        {
            question: "Do you also work in towns across Arad County?",
            answer: "Yes. For the more distant towns in the county we discuss travel, but most of the time we don't add anything.",
        },
    ],
};

export default content;
