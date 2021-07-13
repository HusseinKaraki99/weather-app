import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from "../Components/Layout/Layout"
import Search from '../Components/Search&Unit/Search&Unit'




export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather App | Hussein Karaki" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Search />
      </Layout>
    </div>
  )
}
