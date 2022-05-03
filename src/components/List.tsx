import { styled } from 'linaria/react'
import { css } from 'linaria'
import { House } from '../share/models'
import React, { FC } from 'react'
import Row from './Row'


export const Label = styled.div`
    font-size: 14px;
    color: #777;
`

interface ListProps {
    house: House
}

export const List: FC<ListProps> = ({ house }) => {
    return <Row></Row>
}
