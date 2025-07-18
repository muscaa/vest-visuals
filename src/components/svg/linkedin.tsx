import { IconProps } from "@/components/snippets";

export default function Linkedin(props: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="currentColor"
            stroke="currentColor"
            width={props.size}
            height={props.size}
            strokeWidth={props.strokeWidth}
            className={props.className}
        >
            <path d="m100.28 448h-92.88v-299.1h92.88zm-46.49-339.9c-29.7 0-53.79-24.6-53.79-54.3a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zm394.11 339.9h-92.68v-145.6c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7v148.1h-92.78v-299.1h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3v164.3z" />
        </svg>
    );
}
