import { useState, useEffect, useCallback } from 'react'

type Roulette<T> = {
  item?: T
  currentItem?: T
  isStarted: boolean
  isStopped: boolean
  isFinished: boolean
  onTriggerRoulette: () => void
}

export const useRoulette = <T>(contents: T[]): Roulette<T> => {
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [isStopped, setIsStopped] = useState<boolean>(false)
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [index, setIndex] = useState<number>(0)
  const [currentItem, setCurrentItem] = useState<T>()

  useEffect(() => {
    if (isFinished) {
      setCurrentItem(undefined)
      return
    }

    if (isStarted) {
      const interval = setInterval(() => {
        setIndex((oldIndex: number) => {
          return oldIndex < contents.length - 1 ? oldIndex + 1 : 0
        })
      }, 50)
      return () => clearInterval(interval)
    }

    if (isStopped) {
      setCurrentItem(contents[index])
      if (contents.length === 1) {
        setIsFinished(true)
      }
    }

    return () => clearInterval(0)
  }, [isStarted, isStopped])

  const onTriggerRoulette = useCallback(() => {
    if (isFinished) {
      return
    }
    setIsStopped(isStarted)
    setIsStarted(!isStarted)
  }, [isStarted])

  return {
    item: contents[index],
    currentItem,
    isStarted,
    isStopped,
    isFinished,
    onTriggerRoulette,
  }
}
