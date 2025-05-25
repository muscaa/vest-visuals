import ThemeToggle from "@/components/theme/theme-toggle";
import { TestCard } from "@/components/test-card";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center size-full gap-2">
            <ThemeToggle />
            <TestCard />
        </div>
    );
}
