import { NextPage } from 'next'
import Head from 'next/head'

const IndexPage: NextPage = () => {
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
    </>
  )
}

export default IndexPage
