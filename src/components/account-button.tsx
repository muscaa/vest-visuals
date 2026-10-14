import { Link } from "@tanstack/react-router";
import { IconUser } from "@tabler/icons-react";
import { m } from "@shared/paraglide/messages";
import { Button } from "@/components/ui/button";

export function AccountButton() {
    return (
        <Button
            variant="ghost"
            size="icon"
            nativeButton={false}
            render={<Link to="/account" />}
            aria-label={m.nav_account()}
            title={m.nav_account()}
        >
            <IconUser />
        </Button>
    );
}
