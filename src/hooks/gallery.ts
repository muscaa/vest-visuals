import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { InfiniteData, QueryKey, UseSuspenseInfiniteQueryOptions } from "@tanstack/react-query";
import type { GalleryPage } from "@shared/gallery";

type GalleryQuery<TKey extends QueryKey> = UseSuspenseInfiniteQueryOptions<GalleryPage, Error, InfiniteData<GalleryPage>, TKey, number>;

/** An endless gallery's pages, as the props of `Gallery`. Prefetch the query in the route's loader. */
export function useGalleryQuery<TKey extends QueryKey>(query: GalleryQuery<TKey>) {
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(query);
    const items = useMemo(() => data.pages.flatMap((page) => page.items), [data.pages]);
    const onLoadMore = useCallback(() => void fetchNextPage(), [fetchNextPage]);

    return { items, hasMore: hasNextPage, loadingMore: isFetchingNextPage, onLoadMore };
}
