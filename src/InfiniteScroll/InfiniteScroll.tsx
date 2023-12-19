import { useEffect, useRef, useState } from "react";
import { InfiniteScrollProps, PostType } from "../models/models.type";
import styles from "./InfiniteScroll.module.css";

function InfiniteScroll(props: InfiniteScrollProps) {
    const count: number = 10;
    const [offset, setOffset] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isScrollbarAppeared, setIsScrollbarAppeared] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    let isPaginationAPICallAllowed: boolean = true;

    // This useEffect is for making the very first API call
    useEffect(() => {
        makeAPICall();
    }, [])

    // This useEffect will make sure to load subsequent set of data until scrollbar appears
    useEffect(() => {
        if (!isScrollbarAppeared && props.itemList.length > 0) {
            const isScrollAvailable: boolean = isScrollPresent();
            setIsScrollbarAppeared(isScrollAvailable);
            if (!isScrollAvailable) {
                makeAPICall();
            }
        }
    }, [props.itemList])

    async function makeAPICall() {
        setIsLoading(true);
        const data: PostType[] = await props.fetchData(props.baseUrl, offset, count);
        props.updateList(data);
        setOffset(offset + count);
        setIsLoading(false);
    }

    function isScrollPresent(): boolean {
        const clientHeight = containerRef.current!.clientHeight;
        const scrollHeight = containerRef.current!.scrollHeight;
        return scrollHeight > clientHeight;
    }

    async function scrollHandler(event: React.UIEvent<HTMLDivElement>) {
        const scrollHeight = event.currentTarget.scrollHeight;
        const scrollTop = event.currentTarget.scrollTop;
        const clientHeight = event.currentTarget.clientHeight;
        // Note: => scrollHeight - scrollTop = clientHeight , when scroll bar touches the bottom
        // We'll add 100px to clientHeight so that next API call gets triggered before the
        // scroll bar touches the bottom

        if ((scrollHeight - scrollTop) < (clientHeight + 100)) {
            if (isPaginationAPICallAllowed) {
                isPaginationAPICallAllowed = false;
                makeAPICall();
            }
        }
    }

    return (
        <div className={styles.container} ref={containerRef} onScroll={scrollHandler}>
            {
                isLoading && (props.itemList.length === 0) ? props.loaderComponent() : (
                    props.itemList.map(item => props.listItemComponent(item.id, item.userId, item.title))
                )
            }
        </div>
    )
}

export default InfiniteScroll;
