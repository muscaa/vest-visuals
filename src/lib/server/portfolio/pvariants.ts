import {
    PORTFOLIO_MEDIA_VARIANTS,
    PortfolioMediaVariantsTable,
} from "@server/db/schema";
import {
    MediaVariants,
    Props,
} from "./variants";
import { MediaInfo } from "@type/media/info";
import { MediaVariant, CreateProps } from "@type/media/variants";

export class PortfolioMediaVariants extends MediaVariants<any> {

    format(props: { createdAt: Date; updatedAt: Date; contentId: string; tag: string; order: number; type: "image" | "video"; info: MediaInfo | null; }): MediaVariant {
        throw new Error("Method not implemented.");
    }

    insert(props: CreateProps): Promise<MediaVariant | undefined> {
        throw new Error("Method not implemented.");
    }

    getBucket(props: {}): string {
        throw new Error("Method not implemented.");
    }

    getPath(props: { contentId: string; tag: string; }): string {
        throw new Error("Method not implemented.");
    }
}

const INSTANCE = new PortfolioMediaVariants(PORTFOLIO_MEDIA_VARIANTS);
