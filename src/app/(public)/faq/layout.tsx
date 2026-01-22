import {
    BaseLayout,
    createMetadata,
} from "@/components/layout";
import { FAQ } from "@shared/paths";

export const metadata = createMetadata({
    route: FAQ,
    routeName: "FAQ",
});

export default BaseLayout;
