import styled, { css } from 'styled-components'

export const Main = styled.main`

    ${props =>
      props.content &&
      css`
        margin-top: 16px
    `}
`