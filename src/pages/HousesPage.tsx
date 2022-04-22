import React, { FC, useEffect, useState } from 'react'
import usePath from 'react-use-path'
import { css } from 'linaria'
import Container from '../components/Container'
import HSpace from '../components/HSpace'
import Layout from '../components/Layout'
import Column from '../components/Column'
import AdminSignPage from './AdminSignInPage'
import Row from '../components/Row'
import { Table, Tbody, Thead } from '../components/Table'
import Button, { OpButton } from '../components/Button'
import { format } from 'date-fns'
import useSession from '../hooks/useSession'
import {  HouseLevel, ReviewMaterial, Sex, Status } from '../share/models'
import { getReviewMaterials, getHouses, deleteHouse } from '../share/api'
import { useQuery } from '../hooks/useQueryMutation'
import AdminHeader from '../components/AdminHeader'



const HousesPage: FC = () => {
    const [_, setPath] = usePath()
    const [session] = useSession()
    const { data, refresh } = useQuery(() => getHouses())
    console.log(data)

    return <Layout>
        <AdminHeader />
        <HSpace height={32} />
        <Container>
                {session ? <Column>
            <Row className={css`
                align-self: stretch;
                justify-content: space-between;
                margin: 0 16px;
            `}>
                <h2>房源列表</h2>
                <Button onClick={() => setPath('/houses-create')}>新建房源</Button>
            </Row>
                <Table>
                    <Thead>
                        <tr>
                            <th>标题</th>
                            <th>房型</th>
                            <th>位置</th>
                            <th>价格</th>
                            <th>等级</th>
                            <th>操作</th>
                        </tr>
                    </Thead>
                    <Tbody>
                        {data?.map((row) => {
                            return <tr key={row.id} onClick={() => {}}>
                                <td>{row.title}</td>
                                <td>{row.type}</td>
                                <td>{row.location}</td>
                                <td>{row.price}</td>
                                <td>{row.level ? row.level === 1 ? "一级" : row.level === 2 ? "二级" : "三级" : "无"}</td>
                                <td>
                                    <Row>
                                        <OpButton color="green" action={() => setPath(`/adminhouses_${row.id}`)}>查看</OpButton>
                                        <OpButton color="green" action={() => setPath(`/houses-update_${row.id}`)}>修改</OpButton>
                                        <OpButton color="green" action={() => {
                                            deleteHouse(row.id!).then(() => refresh())
                                        }}>删除</OpButton>
                                    </Row>
                                </td>
                            </tr>
                        })}
                    </Tbody>
                </Table>
        </Column>
        : <AdminSignPage />}
        </Container>
    </Layout>
}

export default HousesPage
