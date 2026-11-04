/**
 * Posting the contact forms' messages to a Discord channel, through its webhook. Without `DISCORD_CONTACT_WEBHOOK_URL`,
 * as in development, they're printed to the server's console instead.
 */
import { envServer } from "@server/env";

export interface ContactMessage {
    name: string;
    email: string;
    message: string;
    /** which site it was sent from */
    site: string;
}

/** --color1, the embed's stripe */
const primary = 0x4b71d8;

/** Posts a contact message as one embed; nobody it names gets pinged, whatever it says. */
export async function postContactMessage(contact: ContactMessage) {
    const url = envServer.DISCORD_CONTACT_WEBHOOK_URL;
    if (!url) {
        console.info(`\n[contact] from: ${contact.name} <${contact.email}> on ${contact.site}\n${contact.message}\n`);
        return;
    }

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: "Vest Visuals",
            // a message can't ping @everyone or anyone else
            allowed_mentions: { parse: [] },
            embeds: [{
                title: `Mesaj nou de pe ${contact.site}`,
                color: primary,
                description: contact.message,
                fields: [
                    { name: "Nume", value: contact.name, inline: true },
                    { name: "Email", value: contact.email, inline: true },
                ],
                timestamp: new Date().toISOString(),
            }],
        }),
        signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
        throw new Error(`Discord didn't take the contact message: ${response.status} ${await response.text()}`);
    }
}
