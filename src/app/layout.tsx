import {
    RootLayout,
    createMetadata,
} from "@/components/layout";
import { HOME } from "@shared/paths";

export const metadata = createMetadata({
    route: HOME,
    routeName: "Acasă",
});

export default RootLayout;
