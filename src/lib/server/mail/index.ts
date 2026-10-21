export interface Mail {
    subject: string;
    text: string;
}

/**
 * Sends an email. For now it only prints it to the server console.
 * TODO: send real emails through an email provider.
 */
export async function sendMail(to: string, mail: Mail) {
    console.info(`\n[mail] to: ${to}\n[mail] subject: ${mail.subject}\n${mail.text}\n`);
}
