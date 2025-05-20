import { Button } from "@/components/ui/button";
import ThemeToggle from "@/theme/theme-toggle";

export default function Home() {
    return (
        <div className="flex items-center justify-center min-h-screen min-w-screen gap-2">
            <Button>
                hello world
            </Button>
            <ThemeToggle />
        </div>
    );
}
