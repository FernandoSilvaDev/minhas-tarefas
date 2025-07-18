import styled from 'styled-components'

type Props = {
  $ativo: boolean
}
//o Omit faz a omissão de tipagem de elementos que desejar

export const Card = styled.div<Props>`
  padding: 8px;
  border: 1px solid ${({ $ativo }) => ($ativo ? '#1e90ff' : '#a1a1a1')};
  background-color: ${({ $ativo }) => ($ativo ? '#fff' : '#fcfcfc')};
  color: ${(props) => (props.$ativo ? '#1e90ff' : '#5e5e5e')};
  cursor: pointer;
  border-radius: 8px;
`

export const Contador = styled.span`
  font-weight: bold;
  font-size: 24px;
  display: block;
`

export const Label = styled.span`
  font-size: 14px;
`
