import OnlineBadge from './OnlineBadge'
import OfflineBadge from './OfflineBadge'
import { Avatar } from '@mui/material'
import { UserDoc } from '@/core/firebase'

interface OnlineUserProps extends UserDoc {
}

const UserAvatar = ({ name, photoURL, status }: OnlineUserProps) => {
    return <div>
        {status === 'on' ? <>
            <OnlineBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
            >
                <Avatar alt={name} src={photoURL} />
            </OnlineBadge>
            <p>{name}</p>
        </>
            : <>
                <OfflineBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar alt={name} src={photoURL} />
                </OfflineBadge>
                <p>{name}</p>

            </>}

    </div >
}

export default UserAvatar