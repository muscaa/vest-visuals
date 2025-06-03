"use client";

import { Main } from "@/components/main";
import {
    useState,
    useEffect
} from "react";

function Category(props: { name: string, selected: boolean, onSelect?: () => void, className?: string }) {
    return (
        <div
            onMouseEnter={props.onSelect}
            className={`${props.selected ? "sm:w-[400%] not-sm:h-[400%]" : "sm:w-full not-sm:h-full"}
                transition-all ease-in-out duration-700 sm:h-full not-sm:w-full ${props.className}`}
        >

        </div>
    );
}

export default function Home() {
    const [category, setCategory] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCategory((prev) => {
                return (prev + 1) % 6;
            });
        }, 3000);
        
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Main>
            <div className="flex flex-col items-center justify-center size-full gap-2 p-2">
                <div className="flex not-sm:flex-col w-full h-[calc(100vh-5rem)] max-w-8xl gap-1">
                    <Category name="1" selected={category == 0} onSelect={() => setCategory(0)} className="bg-red-400" />
                    <Category name="2" selected={category == 1} onSelect={() => setCategory(1)} className="bg-purple-400" />
                    <Category name="3" selected={category == 2} onSelect={() => setCategory(2)} className="bg-green-400" />
                    <Category name="4" selected={category == 3} onSelect={() => setCategory(3)} className="bg-blue-400" />
                    <Category name="5" selected={category == 4} onSelect={() => setCategory(4)} className="bg-yellow-400" />
                    <Category name="6" selected={category == 5} onSelect={() => setCategory(5)} className="bg-indigo-400" />
                </div>
                <div className="w-full h-128 bg-green-400">

                </div>
            </div>
        </Main>
    );
}
