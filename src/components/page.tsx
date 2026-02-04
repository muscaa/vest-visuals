import { routing } from "@/i18n/routing";

export interface LocaleProp {
    locale: typeof routing.locales[number];
}

export type PageParams<V = {}> = Promise<V & LocaleProp>;

export interface Props {
    params: PageParams;
}
