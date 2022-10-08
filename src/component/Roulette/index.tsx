import styled from '@emotion/styled'
import DoneIcon from '@mui/icons-material/Done'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RefreshIcon from '@mui/icons-material/Refresh'
import StopIcon from '@mui/icons-material/Stop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { useCallback, useEffect } from 'react'
import { Image } from './Image'
import { useRoulette } from './useRoulette'
import { User } from '@/component/Top'
import { resetUsers, updateUser } from '@/external/firebase/firestore'

const AnimationImageWrapper = styled.div`
  -webkit-animation: pulsate-fwd 0.5s ease-in-out both 1;
  animation: pulsate-fwd 0.5s ease-in-out both 1;
  opacity: 1;

  @-webkit-keyframes pulsate-fwd {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    50% {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes pulsate-fwd {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    50% {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
`

const StartButton = styled(Button)`
  padding: 24px;
  font-size: 1.5rem;

  & svg:nth-of-type(1) {
    font-size: 32px;
  }
`

type Props = {
  selected: User[]
  unselected: User[]
  setSelected: (users: User[]) => void
  setUnselected: (users: User[]) => void
}

export const Roulette: React.FC<Props> = ({
  selected,
  unselected,
  setSelected,
  setUnselected,
}) => {
  const {
    item,
    currentItem,
    isStarted,
    isStopped,
    isFinished,
    onTriggerRoulette,
  } = useRoulette<User>(unselected)

  useEffect(() => {
    if (isStopped && item) {
      // 選択済み
      selected.push(item)
      setSelected(selected)
      // 未選択
      setUnselected(unselected.filter((user) => user.id !== item.id))
    }
  }, [isStopped])

  useEffect(() => {
    if (isStopped && item) {
      const setFirestore = async (user: User) => {
        await updateUser(user.id, {
          isSelected: true,
        })
      }
      setFirestore(item)
    }
  }, [isStopped])

  const onReset = useCallback(() => {
    const setFirestore = async () => {
      await resetUsers()
    }
    setFirestore()
  }, [])

  return (
    <Paper elevation={0} sx={{ my: 4 }}>
      <Box
        sx={{
          p: 2,
          textAlign: 'center',
        }}
      >
        {isStopped ? (
          <AnimationImageWrapper>
            <Image alt={`${currentItem?.name}`} src={`${currentItem?.url}`} />
          </AnimationImageWrapper>
        ) : (
          <Image alt={`${item?.name}`} src={`${item?.url}`} />
        )}
      </Box>
      <Box sx={{ p: 2 }}>
        {isFinished ? (
          <StartButton
            startIcon={<DoneIcon />}
            variant='contained'
            fullWidth
            disabled
          >
            FINISH
          </StartButton>
        ) : (
          <StartButton
            startIcon={isStarted ? <StopIcon /> : <PlayArrowIcon />}
            color={isStarted ? 'error' : 'success'}
            variant='contained'
            fullWidth
            onClick={onTriggerRoulette}
          >
            {isStarted ? 'STOP' : 'START'}
          </StartButton>
        )}
      </Box>
      <Box sx={{ p: 2 }}>
        <Button
          startIcon={<RefreshIcon />}
          color='info'
          variant='outlined'
          fullWidth
          onClick={onReset}
        >
          RESET
        </Button>
      </Box>
    </Paper>
  )
}
