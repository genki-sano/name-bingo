import type { NextPage } from 'next'
import Head from 'next/head'
import { Top, User } from '@/component/Top'
import { getUsersByIsSelected } from '@/external/firebase/firestore'

type Props = {
  unselected: User[]
  selected: User[]
}

const HomePage: NextPage<Props> = ({ unselected, selected }) => {
  return (
    <>
      <Head>
        <title>名前ビンゴ</title>
        <meta
          name='description'
          content='お手製の名前ビンゴ用ルーレットです。'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Top unselected={unselected} selected={selected} />
    </>
  )
}

export const getServerSideProps = async () => {
  const unselected = await getUsersByIsSelected(false)
  const selected = await getUsersByIsSelected(true)

  return {
    props: {
      unselected,
      selected,
    },
  }
}

export default HomePage
