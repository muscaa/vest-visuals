import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
import { CONTACT } from "@shared/paths";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: CONTACT,
        routeName: "Contact",
    }),
});

export default NavbarLayout;
