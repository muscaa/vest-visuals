"use client";

import { useContext } from "react";
import { Dnd } from "@/contexts/dnd";

export function useDnd() {
    return useContext(Dnd);
}
