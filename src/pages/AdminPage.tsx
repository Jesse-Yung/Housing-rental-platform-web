import React, { FC, useEffect, useState } from 'react'
import usePath from 'react-use-path'
import { css } from 'linaria'
import Container from '../components/Container'
import { HeaderAnchor, HeaderInner, HeaderLink, HeaderLinks } from '../components/Header'
import HSpace from '../components/HSpace'
import Layout from '../components/Layout'
import Column from '../components/Column'
import { AdminSession, api, ReviewMaterial, Status } from '../api'
import AdminSignPage from './AdminSignInPage'
import Row from '../components/Row'
import { Table, Tbody, Thead } from '../components/Table'
import { OpButton } from '../components/Button'
import { format } from 'date-fns'


export const AdminHeader: FC = () => {
    return  <div className={css`
        padding-top: 24px;
        padding-bottom: 24px;
        background-color: #227093;
    `}>
        <Container>
            <HeaderInner>
                <HeaderAnchor>青租管理平台</HeaderAnchor>
                <HeaderLinks>
                    <HeaderLink>
                        <HeaderAnchor href="/admin" onClick={() => {
                            api.signOut()
                            window.location.reload()
                        }}>
                            登出
                        </HeaderAnchor>
                    </HeaderLink>
                </HeaderLinks>
            </HeaderInner>
        </Container>
    </div>
}


const AdminPage: FC = () => {
    const [_, setPath] = usePath()
    const [reviewMaterials, setReviewMaterials] = useState<ReviewMaterial[]>()
    const signIn = (api.session.getSession() as AdminSession)?.admin?.id ? true : false
    useEffect(() => {
        api.reviewMaterials.find().exec().then((data) => {
            setReviewMaterials(data)
        })
    }, [])

    return <Layout>
        <AdminHeader />
        <HSpace height={32} />
        <Container>
                {signIn ? <Column>
            <Row className={css`
                align-self: stretch;
                justify-content: space-between;
                margin: 0 16px;
            `}>
                <h2>审核列表</h2>
            </Row>
                <Table>
                    <Thead>
                        <tr>
                            <th>姓名</th>
                            <th>发起时间</th>
                            <th>完成时间</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </Thead>
                    <Tbody>
                        {reviewMaterials?.map((row: ReviewMaterial) => {
                            return <tr key={row.id} onClick={() => {}}>
                                <td>{row.name}</td>
                                <td>{format(new Date(row.createdAt), 'Y年M月d日hh:ss')}</td>
                                <td>{row.status === Status.finished ? format(new Date(row.updatedAt), 'Y年M月d日hh:ss') : ''}</td>
                                <td>{row.status === Status.pengding ? "等待审核中" : row.status === Status.processing ? "审核中" : "审核完成"}</td>
                                <td>
                                    <Row>
                                        <OpButton hidden={row.status === Status.finished} color="green" action={() => setPath(`/reviews_${row.id}`)}>审核</OpButton>
                                        <OpButton color="green" action={() => setPath(`/reviews-apply_${row.id}`)}>查看</OpButton>
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

export default AdminPage
