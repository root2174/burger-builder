import styled, { css } from 'styled-components'

export const Main = styled.main`

    ${props =>
      props.showcase &&
      css`
        margin-top: 16px
    `}
`
