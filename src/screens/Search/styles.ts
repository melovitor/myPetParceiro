import styled from "styled-components/native";

export const Wrapper = styled.View`
    gap: 32px;
    background: ${({theme}) =>  theme.COLORS.WHITE};
    height: 100%;
`

export const Container = styled.View`
    gap: 16px;
    margin: 0 16px;
`

export const EmptyContainer = styled.View`
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 32px;
`

export const Title = styled.Text`
    font-size: 18px;
    color: ${({theme}) =>  theme.COLORS['GRAY_300']};
`
export const SubTitle = styled.Text`
    font-size: 18px;
    color: ${({theme}) =>  theme.COLORS['GRAY_400']};
`