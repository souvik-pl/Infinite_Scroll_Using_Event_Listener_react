export type PostType = {
    id: number;
    userId: number;
    title: string;
    body?: string;
    reactions?: number;
    tags?: string[];
}


export type PostProps = {
    post: PostType
}


export type PostAPIResult = {
    limit: number;
    skip: number;
    total: number;
    posts: PostType[];
}


export type InfiniteScrollProps = {
    baseUrl: string;
    itemList: PostType[];
    updateList: (newData: PostType[]) => void;
    listItemComponent: (postId: number, userId: number, title: string) => JSX.Element;
    loaderComponent: () => JSX.Element;
    fetchData: (baseURL: string, offset: number, count: number) => Promise<PostType[]>;
}
