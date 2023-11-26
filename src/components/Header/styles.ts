import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"

export const Container = styled.View`
    display: grid;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 16px;
    width: 100%;
    grid-template-columns: 100px 200px; 
`

export const BackButton = styled(TouchableOpacity)`
    display: flex;
    width: 33%;
    box-sizing: border-box;
    padding-left: 16px;
    
`

export const TitlePage = styled.View`
    width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Space = styled.View`
    width: 33%;
`

export const Title = styled.Text`
    font-size: 16px;
    text-transform: uppercase;
`