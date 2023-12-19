import { PostProps } from "../models/models.type";
import styles from "./Post.module.css";

function Post(props: PostProps) {

    return (
        <div className={styles.container}>
            <p><strong>Post ID: </strong> {props.post.id}</p>
            <p><strong>User ID: </strong> {props.post.userId}</p>
            <p><strong>Title: </strong> {props.post.title}</p>
        </div>
    )
}

export default Post;
