import { styled } from 'linaria/react'
import { light, dark, lightBorder, darkBorder } from '../styles/theme'

const Section = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px 0;
    ${light} {
        border-top: 1px solid ${lightBorder};
    }
    ${dark} {
        border-top: 1px solid ${darkBorder};
    }
`

export default Section
