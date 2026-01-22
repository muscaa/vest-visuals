import {
    BaseLayout,
    createMetadata,
} from "@/components/layout";
import { PORTFOLIO } from "@shared/paths";

export const metadata = createMetadata({
    route: PORTFOLIO,
    routeName: "Portofoliu",
});

export default BaseLayout;
