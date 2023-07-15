import moment from "moment"
import styles from './Message.module.scss'
import { Avatar } from "@mui/material"
import { MessageDoc } from "@/core/firebase"

interface MessageProps extends MessageDoc { }

const Message = ({ author, authorPhotoURL, content, firstCreated, lastUpdated }: MessageProps) => {
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