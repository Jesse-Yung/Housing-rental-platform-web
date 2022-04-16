
import { styled } from 'linaria/react'
import { css } from 'linaria'
import React, { FC } from 'react'

const Button = styled.button`
    background-color: #0a6bff;
    border-radius: 4px;
    border: 0;
    box-shadow: rgba(1,60,136,.5) 0 -1px 3px 0 inset,rgba(0,44,97,.1) 0 3px 6px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-family: "Space Grotesk",-apple-system,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 16px;
    font-weight: 700;
    padding: 10px 15px;
    position: relative;
    text-align: center;
    user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    transition: all .2s cubic-bezier(.22, .61, .36, 1);
    &:hover {
        background-color: #065dd8;
        transform: translateY(-2px);
    }
    &:disabled {
        transform: none;
        background-color: gray;
    }
`

interface OpButtonProps {
    color: String
    action(): void
    disable?: boolean
    hidden?: boolean
}

export const OpButton: FC<OpButtonProps> = ({ children, color, action, disable, hidden }) => {
    return <button className={css`
        min-width: 58px;
        backface-visibility: hidden;
        margin-right: 16px;
        border-radius: 10px;
        border-style: none;
        box-shadow: rgba(39, 174, 96, .15) 0 4px 9px;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        font-family: Inter,-apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: normal;
        line-height: 1.5;
        outline: none;
        padding: 8px 16px;
        position: relative;
        text-align: center;
        text-decoration: none;
        transition: all .2s cubic-bezier(.22, .61, .36, 1);
        &:hover {
            background-color: #065dd8;
            transform: translateY(-2px);
        }
        &:disabled {
            background-color: gray !important;
            &:hover {
                transform: none;
            }
        }
    `} style={{ backgroundColor: color }} onClick={(e) => {
        e.stopPropagation()
        action()
    }} disabled={disable} type='button' hidden={hidden}>{children}</button>
}

export default Button
