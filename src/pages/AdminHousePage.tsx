import React, { FC, useEffect, useState } from 'react'
import { css } from 'linaria'
import * as api from '../share/api'
import ModalImage from "react-modal-image"
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



interface AdminHousePageProps {
    id?: string
}

const AdminHousePage: FC<AdminHousePageProps> = ({ id }) => {

    const [session, setSession] = useSession()
    const [{ path }, setPath] = usePath()
    const { data } = useQuery(() => api.getHouse(id!))
    return <Layout>
        <AdminHeader />
        <HSpace height={16} />
        <Container>
            <Row style={{ justifyContent: 'space-between' }}>
                <Button onClick={() => window.history.go(-1)}>返回</Button>
            </Row>
            <HSpace height={16} />
            <TableContainer>
                <h1>房型详情</h1>
                <Table>
                    <tbody>
                        <tr>
                            <th>标题</th>
                            <td colSpan={3}>{data?.title}</td>
                        </tr>
                        <tr>
                            <th>户型</th>
                            <td>{data?.type}</td>
                            <th>位置</th>
                            <td>{data?.location}</td>
                        </tr>
                        <tr>
                            <th>面积</th>
                            <td>{data?.area}</td>
                            <th>价格</th>
                            <td>{data?.price}</td>
                        </tr>
                        <tr>
                            <th>租房等级</th>
                            <td colSpan={3}>{data?.level === 1 ? "一级" : data?.level === 2 ? "二级" : "三级"}</td>
                        </tr>
                        <tr>
                            <th>图片</th>
                            <td colSpan={3}>
                                <Row style={{ flexWrap: 'wrap' }}>
                                {data?.pictures?.map((p) => {
                                return<div style={{ maxWidth: '200px' }}>
                                    <ModalImage
                                    small={p}
                                    large={p}
                                    alt="查看图片"
                                    />
                                </div>
                                })}
                                </Row>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </TableContainer>
        </Container>
    </Layout>
}

export default AdminHousePage
