import React, { FC, useEffect, useState } from 'react'
import usePath from 'react-use-path'
import { css } from 'linaria'
import Container from '../components/Container'
import HSpace from '../components/HSpace'
import Layout from '../components/Layout'
import Column from '../components/Column'
import Row from '../components/Row'
import useSession from '../hooks/useSession'
import { getHouse, getHouses } from '../share/api'
import { useQuery } from '../hooks/useQueryMutation'
import Header from '../components/Header'
import WSpace from '../components/WSpace'
import { Label } from '../components/List'
import { format } from 'date-fns'
import Button from '../components/Button'

interface HouseProps {
    id?: string
}

const House: FC<HouseProps> = ({ id }) => {
    const [_, setPath] = usePath()
    const [session] = useSession()
    const [seletedImg, setSeletedImg] = useState<string>()
    const { data, refresh } = useQuery(() => getHouse(id!), {
        onData: (d) => { setSeletedImg(d.pictures![0]) }
    })
    console.log(seletedImg)

    return <Layout>
        <Header />
        <HSpace height={32} />
        <Container className={css`
            body {
                background-color: rgb(238, 238, 238);
            }
        `}>
            {data ? <Column className={css`
                flex-grow: 1;
            `}>
                <div className={css`
                    align-self: flex-start;
                    background-color: #009688;
                    color: white;
                    cursor: pointer;
                    border-radius: 4px;
                    padding: 6px 20px;
                    &:hover {
                        background-color: #33aba0;
                    }
                `} onClick={() => setPath('/home-houses')}>返回列表</div>
                <h2 style={{ alignSelf: 'flex-start' }}>{data?.title}</h2>
                <Row className={css`
                    border-bottom: 2px solid #009688;
                    align-self: stretch;
                `}>
                    <span className={css`
                        width: 116px;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        background-color: #009688;
                        color: white;
                    `}>房源概况</span>
                </Row>
                <Row className={css`
                    padding: 0 15px;
                    box-shadow: 0 3px 10px #999;
                    background: #fff;
                    align-self: stretch;
                    padding: 16px 6px;
                `}>
                    <Column>
                        <img style={{ width: '620px', height: '300px' }} src={seletedImg} />
                        <Row style={{ width: '620px', overflow: 'scroll' }}>
                            {data.pictures?.map((p) => {
                                return <img className={css`
                                    width: 136px;
                                    height: 82px;
                                    margin-right: 16px;
                                    margin-top: 16px;
                                    cursor: pointer;
                                `}
                                onClick={() => {setSeletedImg(p)}}
                                style={{ border: `${seletedImg === p ? '2.5px solid #009688' : '2.5px solid white'}` }} src={p} />
                            })}
                        </Row>
                    </Column>
                    <WSpace width={32} />
                    <Column className={css`
                        flex-grow: 1;
                        align-self: flex-start;
                        align-items: flex-start;
                    `}>
                        <span className={css`
                            font-size: 16px;
                            font-weight: bold;
                        `}>房源概况</span>
                        <Row className={css`
                            align-items: baseline;
                            align-self: stretch;
                            border-bottom: 1px solid #e8e8e8;
                        `}>
                            <span className={css`
                                font-size: 40px;
                                font-weight: bold;
                                margin-top: 6px;
                                color: #f44336;
                            `}>{data.price}</span>
                            <Label>元/月</Label>
                        </Row>
                        <HSpace height={16} />
                        <Row className={css`
                            align-items: baseline;
                            font-weight: 700;
                            font-size: 20px;
                        `}>
                            户型：{data.type}
                            <WSpace width={22} />
                            面积： {data.area}
                            <WSpace width={6} />
                            <Label style={{ fontSize: '10px' }}> 平方米</Label>
                        </Row>
                        <Row className={css`
                            font-size: 14px;
                            margin-top: 12px;
                        `}>
                            <span className={css`
                                font-weight: bold;
                            `}>房号：</span>
                            <Label>{data.title?.split('/')[3]}</Label>
                        </Row>
                        <Row className={css`
                            font-size: 14px;
                            margin-top: 12px;
                        `}>
                            <span className={css`
                                font-weight: bold;
                            `}>起租日期：</span>
                            <Label>{format(new Date(data.updatedAt!), 'Y-MM-dd')}</Label>
                        </Row>
                        <Row className={css`
                            font-size: 14px;
                            margin-top: 12px;
                        `}>
                            <span className={css`
                                font-weight: bold;
                            `}>楼层：</span>
                            <Label>{data.title?.split('/')[2]}</Label>
                        </Row>
                        <Row className={css`
                            font-size: 14px;
                            margin-top: 12px;
                        `}>
                            <span className={css`
                                font-weight: bold;
                            `}>小区：</span>
                            <Label>{data.title?.split('/')[0]}</Label>
                        </Row>
                        <Row className={css`
                            font-size: 14px;
                            margin-top: 12px;
                        `}>
                            <span className={css`
                                font-weight: bold;
                            `}>地址：</span>
                            <Label>{data.title}</Label>
                        </Row>
                        <div className={css`
                            align-self: center;
                            background-color: #009688;
                            color: white;
                            cursor: pointer;
                            border-radius: 4px;
                            padding: 6px 80px;
                            margin-top: 32px;
                            &:hover {
                               background-color: #33aba0;
                            }
                        `}>{session?.user ? '申请' : '请登陆后再操作'}</div>
                    </Column>
                </Row>
            </Column> : null}
        </Container>
    </Layout>
}

export default House
