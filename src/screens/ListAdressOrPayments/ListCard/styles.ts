import styled from "styled-components/native";

export const Wrapper = styled.View`
    width: 100%;
    height: 80px;
    border-radius: 10px;
    background-color: ${({theme}) =>  theme.COLORS['GRAY_50']};
    justify-content: start;
    align-items: center;
    padding: 16px;
    box-sizing: border-box;
    flex-direction: row;
    gap: 16px;
`
export const Container = styled.View`
`

export const Title = styled.Text`
    color:  ${({theme}) =>  theme.COLORS['GRAY_600']};
    font-weight: bold;
`
export const Subtitle = styled.Text`
    color:  ${({theme}) =>  theme.COLORS['GRAY_600']};
    font-size: 14px;
`