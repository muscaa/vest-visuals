import {
    BaseLayout,
    createMetadata,
} from "@/components/layout";
import { CONTACT } from "@shared/paths";

export const metadata = createMetadata({
    route: CONTACT,
    routeName: "Contact",
});

export default BaseLayout;
