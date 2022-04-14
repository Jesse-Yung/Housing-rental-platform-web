import { styled } from 'linaria/lib/react'


export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 360px;
    max-width: 100%;
    padding: 60px;
    background-color: #227093;
    border-radius: 24px;
`

export const FormRow = styled.div`
    &:not(:last-child) {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
    }
`

export const FormLabel = styled.label`
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 8px;
    padding-left: 4px;
`

export const Label = styled.label`
    margin-right: 16px;
    cursor: pointer;
`

export const FormInput = styled.input`
    height: 40px;
    font-size: 16px;
    padding: 0 8px;
    border-radius: 8px;
    border: 1px solid #db14ce;
    outline: none;
    transition: all 0.25s ease-in-out;
    background-color: #444446;
    color: white;
    &:focus {
        border: 1px solid #db14ce;
        box-shadow: 0 0 4px transparentize(#db14ce, 0.5);
        background-color: #666;
    }
`

export const Error = styled.div`
    &::before {
        content: "* ";
        color: red;
    }
    font-size: 12px;
    margin-top: 8px;
    color: rgba(255, 255, 255, 0.6);
`

export const Button = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 8px;
    background: linear-gradient(0.25turn, #0D0DD2, #E98788, #db14ce);
    outline: none;
    border: none;
    margin: 12px 0 0;
    padding: 0 16px;
    font-size: 16px;
    color: white;
    box-shadow: inset 0 -0.7em 0 -0.48em rgba(0,0,0,0.08);
    cursor: pointer;
    &:disabled {
        background-color: #c9c5d1;
        color: #a9a6af;
    }
`
