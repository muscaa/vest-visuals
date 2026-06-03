import { ContactCard } from "../cards/contact";

interface Props {

}

export function ContactPage(props: Props) {
    return (
        <>
            <main className="flex flex-col justify-center items-center w-full min-h-screen-no-nav">
                <ContactCard />
            </main>
        </>
    );
}
