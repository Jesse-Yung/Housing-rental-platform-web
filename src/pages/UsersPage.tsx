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
import { OpButton } from '../components/Button'
import { format } from 'date-fns'
import useSession from '../hooks/useSession'
import {  HouseLevel, ReviewMaterial, Sex, Status } from '../share/models'
import { getReviewMaterials, getUsers } from '../share/api'
import { useQuery } from '../hooks/useQueryMutation'
import AdminHeader from '../components/AdminHeader'



const UsersPage: FC = () => {
    const [_, setPath] = usePath()
    const [session] = useSession()
    const { data } = useQuery(() => getUsers())
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
                <h2>用户列表</h2>
            </Row>
                <Table>
                    <Thead>
                        <tr>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>电话号码</th>
                            <th>等级</th>
                            <th>操作</th>
                        </tr>
                    </Thead>
                    <Tbody>
                        {data?.map((row) => {
                            return <tr key={row.id} onClick={() => {}}>
                                <td>{row.name}</td>
                                <td>{row.sex === Sex.male ? "男" : "女"}</td>
                                <td>{row.phoneNumber}</td>
                                <td>{row.houseLevel ? row.houseLevel === HouseLevel.one ? "一级" : row.houseLevel === HouseLevel.two ? "二级" : "三级" : "无"}</td>
                                <td>
                                    <Row>
                                        <OpButton color="green" action={() => setPath(`/users_${row.id}`)}>查看</OpButton>
                                        <OpButton color="green" action={() => setPath(`/users-update_${row.id}`)}>修改</OpButton>
                                        <OpButton color="green" action={() => setPath(`/reviews_${row.id}`)}>删除</OpButton>
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

export default UsersPage
