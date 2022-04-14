import React, { FC } from 'react'
import { css } from 'linaria'
import Container from '../components/Container'
import { HeaderAnchor, HeaderInner, HeaderLink, HeaderLinks } from '../components/Header'
import useSession from '../hooks/useSession'


const AdminHeader: FC = () => {
    const [_, setSession] = useSession()
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
                        <HeaderAnchor href="/users">
                            用户管理
                        </HeaderAnchor>
                    </HeaderLink>
                    <HeaderLink>
                        <HeaderAnchor href="/admin_hourse">
                            房源管理
                        </HeaderAnchor>
                    </HeaderLink>
                    <HeaderLink>
                        <HeaderAnchor href="/admin">
                            审核管理
                        </HeaderAnchor>
                    </HeaderLink>
                    <HeaderLink>
                        <HeaderAnchor href="/admin" onClick={() => {
                            setSession(undefined)
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


export default AdminHeader
