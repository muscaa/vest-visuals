"use client";

import { useContext } from "react";
import { Main } from "@/contexts/main";

export function useMain() {
    return useContext(Main);
}
