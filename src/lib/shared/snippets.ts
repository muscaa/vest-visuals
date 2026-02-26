import { z } from "zod";

export function dateToString(input: Date | string) {
    const date = typeof input === "string" ? new Date(input) : input;

    return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).replace(",", "");
}

export function zodToString(type: z.ZodType | z.core.$ZodType, indent = 0): string {
    const schema = type as z.ZodType;
    const pad = "  ".repeat(indent);

    if (schema instanceof z.ZodObject) {
        const shape = schema.def.shape;
        const entries = Object.entries(shape).map(([key, value]) => {
            return `${pad}  ${key}: ${zodToString(value, indent + 1)}`;
        });
        return `{\n${entries.join("\n")}\n${pad}}`;
    }

    if (schema instanceof z.ZodArray) {
        return `[]${zodToString(schema.def.element, indent)}`;
    }

    if (schema instanceof z.ZodOptional) {
        return `?${zodToString(schema.def.innerType, indent)}`;
    }

    if (schema instanceof z.ZodNullable) {
        return `${zodToString(schema.def.innerType, indent)} | null`;
    }

    if (schema instanceof z.ZodUnion) {
        return schema.def.options.map(opt => zodToString(opt, indent)).join(" | ");
    }

    return schema.def.type;
}

export function isPastDate(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const d = new Date(date.getTime());
    d.setHours(0, 0, 0, 0);

    return d.getTime() < today.getTime();
}
