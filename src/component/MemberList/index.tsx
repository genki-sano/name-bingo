import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import { User } from '@/component/Top'

type Props = {
  users: User[]
}

export const MemberList: React.FC<Props> = ({ users }) => {
  return (
    <List
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          すでに出た人たち（敬称略）
        </ListSubheader>
      }
    >
      {users.map((user) => (
        <ListItem key={user.id}>
          <ListItemAvatar>
            <Avatar alt={user.name} src={user.url} />
          </ListItemAvatar>
          <ListItemText primary={user.name} />
        </ListItem>
      ))}
    </List>
  )
}
