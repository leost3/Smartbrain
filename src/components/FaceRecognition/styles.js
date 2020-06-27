import styled from 'styled-components'

export const Box = styled.div`
    position:absolute;
    box-shadow: 0 0 0 3px #149df2 inset;
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    cursor: pointer;
    top:${props => props.box.top}px;
    bottom:${props => props.box.bottom}px;
    right:${props => props.box.right}px;
    left:${props => props.box.left}px;
`