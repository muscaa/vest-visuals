import { Icon } from "@/components/snippets";
import {
    useState,
    useEffect,
} from "react";

export interface State {
    x: number;
    y: number;
}

export interface Layer {
    icon: Icon;
    offset: number;
    width: number;
    height: number;
    scale: number;
}

export interface Options {
    xFactor?: number;
    yFactor?: number;
}

export interface ParallaxProps {
    state: State;
    options: Options;
    layer: Layer;
}

export function Parallax(props: ParallaxProps) {
    const xFactor = props.layer.width / props.layer.height;
    const yFactor = props.layer.height / props.layer.width;

    return (
        <div
            className="absolute transition-transform duration-100 ease-out"
            style={{
                width: `max(${props.layer.scale}vw, calc(${props.layer.scale}vh * ${xFactor}))`,
                height: `max(${props.layer.scale}vh, calc(${props.layer.scale}vw * ${yFactor}))`,
                left: `calc(50vw - max(${props.layer.scale}vw, calc(${props.layer.scale}vh * ${xFactor})) / 2)`,
                top: `calc(50vh - max(${props.layer.scale}vh, calc(${props.layer.scale}vw * ${yFactor})) / 2)`,
                transform: `translate(
                    ${props.state.x * props.layer.offset * (props.options.xFactor ?? 1)}px,
                    ${props.state.y * props.layer.offset * (props.options.yFactor ?? 1)}px)`,
            }}
        >
            <props.layer.icon className="absolute inset-0 w-full h-full" />
        </div>
    );
}

export interface ParallaxLayersProps {
    interact: boolean;
    options?: Options;
    layers: Layer[];
}

export function ParallaxLayers(props: ParallaxLayersProps) {
    const [state, setState] = useState<State>({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (!props.interact) return;

            setState({
                x: event.clientX / window.innerWidth - 0.5,
                y: event.clientY / window.innerHeight - 0.5,
            });
        };

        const handleTouchMove = (event: TouchEvent) => {
            if (!props.interact) return;

            setState({
                x: event.touches[0].clientX / window.innerWidth - 0.5,
                y: event.touches[0].clientY / window.innerHeight - 0.5,
            });
        }

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [props.interact]);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            {
                props.layers.map((layer, index) => (
                    <Parallax
                        key={index}
                        state={state}
                        options={props.options || {}}
                        layer={layer}
                    />
                ))
            }
        </div>
    );
}
