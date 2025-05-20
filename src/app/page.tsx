import { Button } from "@/components/ui/button";
import ThemeToggle from "@/theme/theme-toggle";
import { TestCard } from "@/components/test-card";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen min-w-screen gap-2">
            <ThemeToggle />
            <TestCard />
        </div>
    );
}
