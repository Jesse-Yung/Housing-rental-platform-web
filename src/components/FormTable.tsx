import { styled } from 'linaria/lib/react'


export const Form = styled.form`
    display: flex;
    flex-direction: column;
`

export const Table = styled.table`
    align-self: stretch;
    margin: 16px;
    border: 2px solid black;
    border-collapse: collapse;
    font-size: large;
    max-width: 1000px;
    min-width: 700px;
    td {
        border: 2px solid black;
        min-width: 130px;
        padding: 6px;
        max-width: 320px;
    }
    th {
        border: 2px solid black;
        text-align: start;
        padding: 6px;
        font-size: 22px;
    }
    label {
        font-weight: bold;
        padding: 6px;
    }
    span {
        margin: 0 6px;
        align-self: stretch;
    }
    input {
        padding: 2px 6px;
        margin: 0 6px;
        min-width: 230px;
        font-size: 18px;
    }
    input[type="radio"] {
        min-width: auto;
    }
    select {
        font-size: 18px;
    }
    textarea {
        width: 500px;
        font-size: 16px;
        margin: 6px;
    }
`

export const Error = styled.div`
    display: inline-block;
    font-size: 12px;
    margin-left: 8px;
    width: 46px;
    color: red;
`

export const TaskTable = styled.table`
    border: 2px solid black;
    border-collapse: collapse;
    font-size: 20px;
    min-width: 720px;
    .task-no {
        font-weight: bold;
        font-size: 20px;
    }

    label {
        margin-right: 10px;
    }

    .task-no-num {
        text-decoration: underline;
        color: red;
        text-decoration-color: black;
    }

    td {
        border: 2px solid black;
        padding: 6px;
    }

    .label {
        font-weight: bold;
        padding: 0 4px;
    }

    input {
        margin: 0 4px;
        font-size: 18px;
        &.hide {
            display: none;
        }
    }

    .year {
        width: 88px;
    }

    .day {
        width: 44px;
    }

    textarea {
        width: 100%;
    }

    .prefilled {
        color: red;
        font-weight: normal;
    }

    button[type="submit"] {
        width: 72px;
        height: 36px;
        margin-top: 16px;
        outline: none;
        user-select: none;
        border: none;
        background-color: rgb(0, 122, 255);
        border-radius: 8px;
        color: white;
        font-weight: bold;
        font-size: 14px;
    }
`

export const ProcedureRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: stretch;
    cursor: pointer;
    margin-bottom: 6px;
    padding: 6px;
    text-align: center;
    border: 2px solid #fff;
    input {
        cursor: pointer;
        margin-right: 10px;
        width: 18px;
        height: 18px;
        &:hover {
            transform: translateY(-2px);
        }
    }
    &.checked {
        border: 2px solid #065dd8;
        background-color: #b1ddfa;
    }
    &:hover {
        background-color: #b1ddfa;
    }
`

export const LabelRow = styled.label`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    input {
        cursor: pointer;
    }
`

export const Link = styled.a`
   color: blue;
   margin-right: 10px;
   text-decoration: underline;
   font-style: italic;
`
