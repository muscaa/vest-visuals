import {
    Main,
    MainProps,
} from "@/components/main";
import { NavbarAdmin } from "@/components/admin/navbar";

export function MainAdmin(props: MainProps) {
    return (
        <Main
            header={<NavbarAdmin />}
            footer={<></>}
            {...props}
        />
    );
}