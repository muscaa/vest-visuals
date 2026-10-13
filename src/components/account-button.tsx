import { Link } from "@tanstack/react-router";
import { IconUser } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function AccountButton() {
    return (
        <Button
            variant="ghost"
            size="icon"
            nativeButton={false}
            render={<Link to="/account" />}
            aria-label="Contul meu"
            title="Contul meu"
        >
            <IconUser />
        </Button>
    );
}
