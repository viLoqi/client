import StyledBadge from "./StyledBadge";
import { Avatar } from "@mui/material";

interface OnlineUserProps {
    name: string
    photoURL: string
}

const OnlineUser = ({ name, photoURL }: OnlineUserProps) => {
    return <div>
        <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
        >
            <Avatar alt={name} src={photoURL} />
        </StyledBadge>
        <p>{name}</p>
    </div>;
}

export default OnlineUser;