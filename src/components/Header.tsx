import { styled } from 'linaria/react'
import { css } from 'linaria'
import React, { FC, useEffect, useState } from 'react'
import Container from './Container'
import usePath from 'react-use-path'
import { api, UserSession } from '../api'

export const HeaderInner = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const HeaderLinks = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    list-style: none;
    padding: 0;
    font-family: Inter, sans-serif;
    font-size: 14px;
`

export const HeaderLink = styled.li`
    margin-left: 48px;
`

export const HeaderAnchor = styled.a`
    color: white;
    text-decoration: none;
    &:hover {
        color: white;
        text-decoration: none;
    }
    &:visited {
        color: white;
        text-decoration: none;
    }
`

const Header: FC = () => {
    const [login, setLogin] = useState<boolean>()
    useEffect(() => {
        setLogin(!!(api.session.getSession() as UserSession)?.user)
    }, [api.session])
    return <div className={css`
        padding-top: 24px;
        padding-bottom: 24px;
        background-color: #227093;
    `}>
        <Container>
            <HeaderInner>
                <div className={css`
                    font-family: Barlow, sans-serif;
                    font-weight: bold;
                    font-size: 24px;
                `}>
                    <HeaderAnchor href="/">青租</HeaderAnchor>
                </div>
                <HeaderLinks>
                    <HeaderLink>
                        <HeaderAnchor href="/">
                            办事指南
                        </HeaderAnchor>
                    </HeaderLink>
                    <HeaderLink>
                        <HeaderAnchor href="/">
                            法律法规
                        </HeaderAnchor>
                    </HeaderLink>
                    {login ?
                    <HeaderLink>
                        <HeaderAnchor href="personal">
                            个人中心
                        </HeaderAnchor>
                    </HeaderLink> :
                    <HeaderLink>
                        <HeaderAnchor href="sign-up">
                            注册
                        </HeaderAnchor>
                    </HeaderLink>}
                    {login ?
                    <HeaderLink>
                        <HeaderAnchor href="/" onClick={() => {
                            api.signOut()
                            window.location.reload()
                        }}>
                            登出
                        </HeaderAnchor>
                    </HeaderLink> :
                    <HeaderLink>
                        <HeaderAnchor href="sign-in">
                            登陆
                        </HeaderAnchor>
                    </HeaderLink>}
                </HeaderLinks>
            </HeaderInner>
        </Container>
    </div>
}

export default Header
