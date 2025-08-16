interface LoadingProps {
}

export function Loading(props: LoadingProps) {
    return (
        <div className="flex justify-center items-center size-full p-2">
            <h1>Loading...</h1>
        </div>
    );
}

interface NotFoundProps {
}

export function NotFound(props: NotFoundProps) {
    return (
        <div className="flex justify-center items-center size-full p-2">
            <h1>Not Found</h1>
        </div>
    );
}
