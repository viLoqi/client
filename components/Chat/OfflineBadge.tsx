import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'

const OfflineBadge = styled(Badge)(({ theme, color }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: 'gray',
        color: 'gray',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
}))

export default OfflineBadge