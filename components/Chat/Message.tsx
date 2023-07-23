import moment from 'moment'
import styles from './Message.module.scss'
import { Avatar } from '@mui/material'
import { MessageDoc } from '@/core/firebase'

interface MessageProps extends MessageDoc { }

const Message = ({ author, authorPhotoURL, content, firstCreated, lastUpdated }: MessageProps) => {
    const messageDisplayTime = moment(lastUpdated.toDate()).calendar()
    let block = null

    if (content.endsWith('pdf')) {
        block = <object data=
            {content}
            width="800"
            height="500">
        </object>
    } else {
        block = content
    }

    // if firstCreated != lastUpdated then that means the message was edited
    return <div>
        <div>
            <Avatar alt={author} src={authorPhotoURL} />
            <span className={styles['authorName']}>
                {author}
            </span>
            <span className={styles['messageDisplayTime']}>
                {messageDisplayTime}
            </span>
        </div>
        {block}
    </div >
}

export default Message