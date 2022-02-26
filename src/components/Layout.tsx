import React, { FC } from 'react'
import { css } from 'linaria'
import { Helmet } from 'react-helmet'
import {
    contentFontStack,
    dark, darkBackground, darkContent, light, lightBackground, lightContent
} from '../styles/theme'

const Layout: FC = ({ children }) => {
    return <div className={css`
        :global() {
            body {
                margin: 0;
                scroll-behavior: smooth;
                ${light} {
                    background-color: ${lightBackground};
                    color: ${lightContent};
                }
                ${dark} {
                    background-color: ${darkBackground};
                    color: ${darkContent};
                }
                font-family: ${contentFontStack};
            }
            a {
                color: inherit;
                text-decoration: inherit;
            }
        }
    `}>
        <Helmet>
            <title>青租</title>
            <meta name="description" content="Declarative Data Flow in Python" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
            <link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />        </Helmet>
        {children}
    </div>
}

export default Layout
