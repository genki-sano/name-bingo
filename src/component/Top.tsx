import Container from '@mui/material/Container'
import { useState } from 'react'
import { MemberList } from './MemberList'
import { Roulette } from './Roulette'

export type User = {
  id: string
  name: string
  url: string
}

type Props = {
  unselected: User[]
  selected: User[]
}

export const Top: React.FC<Props> = ({ unselected, selected }) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>(selected)
  const [unselectedUsers, setUnselectedUsers] = useState<User[]>(unselected)

  return (
    <Container component='main' maxWidth='sm' sx={{ mb: 8 }}>
      <Roulette
        selected={selectedUsers}
        unselected={unselectedUsers}
        setSelected={setSelectedUsers}
        setUnselected={setUnselectedUsers}
      />
      <MemberList users={selectedUsers} />
    </Container>
  )
}
