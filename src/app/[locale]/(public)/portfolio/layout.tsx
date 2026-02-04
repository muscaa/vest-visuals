import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
import { PORTFOLIO } from "@shared/paths";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: PORTFOLIO,
        routeName: "Portofoliu",
    }),
});

export default NavbarLayout;
