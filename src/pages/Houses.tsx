import React, { FC, useEffect, useState } from 'react'
import usePath from 'react-use-path'
import { css } from 'linaria'
import Container from '../components/Container'
import HSpace from '../components/HSpace'
import Layout from '../components/Layout'
import Column from '../components/Column'
import Row from '../components/Row'
import useSession from '../hooks/useSession'
import { getHouses } from '../share/api'
import { useQuery } from '../hooks/useQueryMutation'
import Header from '../components/Header'
import WSpace from '../components/WSpace'



const Houses: FC = () => {
    const [_, setPath] = usePath()
    const [session] = useSession()
    const { data, refresh } = useQuery(() => getHouses())
    console.log(data)

    return <Layout>
        <Header />
        <HSpace height={32} />
        <Container className={css`
            body {
                background-color: rgb(238, 238, 238);
            }
        `}>
            <Column className={css`
                flex-grow: 1;
            `}>
                <h2 style={{ fontWeight: '340', alignSelf: 'flex-start' }}>可选房源列表</h2>
                <Column className={css`
                    padding: 0 15px;
                    box-shadow: 0 3px 10px #999;
                    background: #fff;
                    align-self: stretch;
                `}>
                    {data?.map((h) => {
                        return <a className={css`
                            display: flex;
                            padding: 16px 10px;
                            align-self: stretch;
                            justify-content: space-between;
                            border-bottom: 1px solid #ddd;
                            h2 {
                                margin: 0;
                                margin-bottom: 16px;
                            }
                            img {
                                width: 300px;
                                height: 160px;
                            }
                            color: #666;
                        `} href={`/home-houses_${h.id}`}>
                            <Row>
                                <img src={h.pictures![0]} alt="" />
                                <WSpace width={10} />
                                <Column style={{ alignItems: 'flex-start', alignSelf: 'flex-start' }}>
                                    <h2>{h.title}</h2>
                                    <span>所属户型：{h.type}</span>
                                    <span>建筑面积：{h.area}平方米</span>
                                    <span>所属户型：{h.type}</span>
                                </Column>
                            </Row>
                            <Row style={{ alignSelf: 'flex-start' }}>
                                <span style={{ color: '#009688', fontSize: '18px' }}>{h.price}</span>
                                <WSpace width={6} />
                                <span>月租金</span>
                            </Row>
                        </a>
                    })}
                    <HSpace height={18} />
                </Column>
            </Column>
        </Container>
    </Layout>
}

export default Houses
