import React, { FC, useEffect, useState } from 'react'
import { css } from 'linaria'
import * as api from '../share/api'
import Column from '../components/Column'
import useSession from '../hooks/useSession'
import usePath from 'react-use-path'
import HSpace from '../components/HSpace'
import Button from '../components/Button'
import { useMutation, useQuery } from '../hooks/useQueryMutation'
import { Table } from '../components/FormTable'
import { TableContainer } from '../components/Table'
import { HouseLevel, Sex } from '../share/models'
import Layout from '../components/Layout'
import AdminHeader from '../components/AdminHeader'
import Header from '../components/Header'
import Container from '../components/Container'
import Row from '../components/Row'
import WSpace from '../components/WSpace'
import Loading from '../components/Loading'



interface UserPageProps {
    id?: string
}

const UserPage: FC<UserPageProps> = ({ id }) => {

    const [session, setSession] = useSession()
    const [{ path }, setPath] = usePath()
    const { data } = useQuery(() => api.getUser(id!))
    const { mutating: delLoading, mutate: deleteUser } = useMutation((id: string) => api.deleteUser(id!), {
        onResult:() => setPath('/users')
     })
    return <Layout>
        {session?.admin ? <AdminHeader /> : <Header />}
        <HSpace height={16} />
        <Container>
            <Row style={{ justifyContent: 'space-between' }}>
                <Button onClick={() => window.history.go(-1)}>返回</Button>
                {session?.admin ? <Row>
                    <Button onClick={() => setPath(`/users-update_${id}`)}>修改</Button>
                    <WSpace width={16} />
                    <Button onClick={() => {
                        if (confirm("确定删除用户吗？")) {
                            deleteUser(id!)
                        }
                    }}>{delLoading ? <div className={css`
                    width: 12px;
                    align-items: center;
                    margin: 0 auto;
                `}><Loading /></div> : '删除'}</Button>
                </Row> : null}
            </Row>
            <HSpace height={16} />
            <TableContainer>
                <h1>用户详情</h1>
                <Table>
                    <tbody>
                        <tr>
                            <th>用户名</th>
                            <td>{data?.username}</td>
                        </tr>
                        <tr>
                            <th>姓名</th>
                            <td>{data?.name}</td>
                        </tr>
                        <tr>
                            <th>性别</th>
                            <td>{data?.sex === Sex.male ? "男" : "女"}</td>
                        </tr>
                        <tr>
                            <th>租房等级</th>
                            <td>{data?.houseLevel ? data?.houseLevel === HouseLevel.one ? "一级" : data?.houseLevel === HouseLevel.two ? "二级" : "三级" : "无"}</td>
                        </tr>
                        <tr>
                            <th>邮箱</th>
                            <td>{data?.email ? data.email : '-'}</td>
                        </tr>
                    </tbody>
                </Table>
            </TableContainer>
        </Container>
    </Layout>
}

export default UserPage
