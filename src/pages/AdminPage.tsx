import React, { FC, useEffect, useState } from 'react'
import usePath from 'react-use-path'
import { css } from 'linaria'
import Container from '../components/Container'
import { HeaderAnchor, HeaderInner, HeaderLink, HeaderLinks } from '../components/Header'
import HSpace from '../components/HSpace'
import Layout from '../components/Layout'
import Column from '../components/Column'
import { AdminSession, api, ReviewMaterial } from '../api'
import AdminSignPage from './AdminSignInPage'


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
            <Container>
                {signIn ? <Column>
                    审核列表
                    {reviewMaterials?.map((reviewMaterial) => {
                        return <a>{reviewMaterial.name}</a>
                    })}
                </Column>

                : <AdminSignPage />}
            </Container>
        </Container>
    </Layout>
}

export default AdminPage
