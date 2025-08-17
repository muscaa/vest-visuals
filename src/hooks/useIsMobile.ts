import { useWindowSize } from "./useWindowSize";

export function useIsMobile() {
    const windowSize = useWindowSize();
    if (windowSize == null) return null;

    return windowSize.width < 1024;
}
