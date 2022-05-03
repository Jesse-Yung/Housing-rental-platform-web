import React, { FC, useEffect, useState } from 'react'
import usePath from 'react-use-path'
import { css } from 'linaria'
import h1 from '../share/h1.jpeg'
import h2 from '../share/h2.jpeg'
import location from '../share/location.png'
import s1 from '../share/s1.png'
import s2 from '../share/s2.png'
import s3 from '../share/s3.png'
import s4 from '../share/s4.png'
import home from '../share/home.png'
import Container from '../components/Container'
import Header from '../components/Header'
import HSpace from '../components/HSpace'
import Layout from '../components/Layout'
import Column from '../components/Column'
import ToolBar from '../components/ToolBar'
import useSession from '../hooks/useSession'
import Row from '../components/Row'
import WSpace from '../components/WSpace'
import { Label } from '../components/List'
import { styled } from 'linaria/lib/react'

const LabelImg = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 200px;
    height: 200px;
    border-radius: 50%;
`


const HomePage: FC = () => {
    const [_, setPath] = usePath()
    return <Layout>
        <Header />
        <HSpace height={32} />
        <Container>
            <Column className={css`
                flex-grow: 1;
            `}>
                <Row style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Row style={{ alignItems: 'baseline' }}>
                        <h2 style={{ fontWeight: '340' }}>可选房源总览</h2>
                        <WSpace width={6} />
                        <Label>好房源那么多，我们为你精选</Label>
                    </Row>
                    <Label onClick={() => setPath('/home-houses')} style={{ cursor: 'pointer' }}>查看更多&gt;&gt;</Label>
                </Row>
                <Row className={css`
                    justify-content: space-between;
                    align-self: stretch;
                    img {
                        width: 240px;
                        height: 150px;
                        margin-right: 20px;
                    }
                `}>
                    <Row className={css`
                        margin: 10px 0;
                        background: #e2e2e2;
                        padding: 15px;
                    `}>
                        <img src={h1} />
                        <Column style={{ alignItems: 'flex-start' }}>
                            <h3>民生路318弄(馨澜公寓)</h3>
                            <HSpace height={16} />
                            <Row>
                                <img style={{ width: '16px', height: '16px', marginRight: '6px' }} src={location} />
                                位置
                            </Row>
                            <HSpace height={6} />
                            <Row>
                                <img style={{ width: '16px', height: '16px', marginRight: '6px' }} src={home} />
                                剩余房源32套
                            </Row>
                        </Column>
                    </Row>
                    <Row className={css`
                        margin: 10px 0;
                        background: #e2e2e2;
                        padding: 15px;
                    `}>
                        <img src={h2} />
                        <Column style={{ alignItems: 'flex-start' }}>
                            <h3>民生路318弄(馨澜公寓)</h3>
                            <HSpace height={16} />
                            <Row>
                                <img style={{ width: '16px', height: '16px', marginRight: '6px' }} src={location} />
                                位置
                            </Row>
                            <HSpace height={6} />
                            <Row>
                                <img style={{ width: '16px', height: '16px', marginRight: '6px' }} src={home} />
                                剩余房源32套
                            </Row>
                        </Column>
                    </Row>
                </Row>
                <HSpace height={32} />
                <Row className={css`
                    justify-content: space-between;
                    align-self: stretch;
                `}>
                    <a className={css`
                       text-align: center;
                    `} href="apply">
                        <h1>提交申请</h1>
                        <LabelImg src={s1}/>
                    </a>
                    <a className={css`
                       text-align: center;
                    `}>
                        <h1>下载合同</h1>
                        <LabelImg src={s2}/>
                    </a>
                    <a className={css`
                       text-align: center;
                    `}>
                        <h1>续租／退租</h1>
                        <LabelImg src={s3}/>
                    </a>
                    <a className={css`
                       text-align: center;
                    `}>
                        <h1>咨询建议</h1>
                        <LabelImg src={s4}/>
                    </a>
                </Row>
            </Column>
            <ToolBar />
        </Container>
    </Layout>
}

export default HomePage
