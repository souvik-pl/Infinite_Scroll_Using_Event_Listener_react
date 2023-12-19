import { useState } from "react";
import styles from "./App.module.css"
import InfiniteScroll from "./InfiniteScroll/InfiniteScroll";
import Post from "./Post/Post";
import { PostAPIResult, PostType } from "./models/models.type";
import LoaderComponent from "./LoaderComponent/LoaderComponent";

function App() {
    const baseURL: string = "https://dummyjson.com/posts";
    const [postList, setPostList] = useState<PostType[]>([]);

    function renderPost(postId: number, userId: number, title: string): JSX.Element {
        return <Post key={postId} post={{ id: postId, userId: userId, title: title }} />
    }

    function renderLoader(): JSX.Element {
        return <LoaderComponent />
    }

    function updatePostList(newData: PostType[]) {
        setPostList([...postList, ...newData]);
    }

    async function fetchData(baseURL: string, offset: number, count: number): Promise<PostType[]> {
        const completeURL: string = `${baseURL}?skip=${offset}&limit=${count}`;
        const response = await fetch(completeURL);
        const parsedData: PostAPIResult = await response.json();
        return parsedData.posts;
    }

    return (
        <div className={styles.container}>
            <InfiniteScroll
                baseUrl={baseURL}
                itemList={postList}
                fetchData={fetchData}
                updateList={updatePostList}
                loaderComponent={renderLoader}
                listItemComponent={renderPost}
            />
        </div>
    );
}


export default App;
