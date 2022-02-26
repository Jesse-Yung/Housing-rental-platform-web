import React, { FC } from 'react'
import usePath from 'react-use-path'
import Header from '../components/Header'
import Layout from '../components/Layout'


const HomePage: FC = () => {
    const [_, setPath] = usePath()
    return <Layout>
        <Header />
        <div>
            房源信息
        </div>
    </Layout>
}

export default HomePage
