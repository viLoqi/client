import moment from "moment"
import { Timestamp } from "firebase/firestore"
import styles from './Message.module.scss'
import { Avatar } from "@mui/material"

export interface MessageElement {
    author: string
    authorPhotoURL: string
    content: string
    firstCreated: Timestamp
    lastUpdated: Timestamp
}

const Message = ({ author, authorPhotoURL, content, firstCreated, lastUpdated }: MessageElement) => {
    const messageDisplayTime = moment().calendar(lastUpdated.toDate()).toString()

    // if firstCreated != lastUpdated then that means the message was edited
    return <div>
        <div>
            <Avatar alt={author} src={authorPhotoURL} />
            <span className={styles["authorName"]}>
                {author}
            </span>
            <span className={styles["messageDisplayTime"]}>
                {messageDisplayTime}
            </span>
        </div>
        {content}
    </div >;
}

export default Message;