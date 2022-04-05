import React, { FC, useEffect, useState } from 'react'
import usePath from 'react-use-path'
import { css } from 'linaria'
import Container from '../components/Container'
import Header from '../components/Header'
import HSpace from '../components/HSpace'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Row from '../components/Row'
import Column from '../components/Column'
import ToolBar from '../components/ToolBar'
import { api, UserSession } from '../api'




const HomePage: FC = () => {
    const [_, setPath] = usePath()
    return <Layout>
        <Header />
        <HSpace height={32} />
        <Container>
            <Column className={css`
                flex-grow: 1;
            `}>
                <h3>房源列表</h3>
            </Column>
            <ToolBar />
        </Container>
    </Layout>
}

export default HomePage
