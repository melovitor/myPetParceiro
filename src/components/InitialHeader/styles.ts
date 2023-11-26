import styled from "styled-components/native"

export const Container = styled.View`
    align-items: flex-start;
`

export const Title = styled.Text`
    font-size: ${({theme}) =>  theme.FONT_SIZE.XXL}px;
    font-family: ${({theme}) =>  theme.FONT_FAMILY.BOLD};
    color: ${({theme}) =>  theme.COLORS.GRAY_700};

`
export const SubTitle = styled.Text`
    font-size: ${({theme}) =>  theme.FONT_SIZE.SM}px;
    color: ${({theme}) =>  theme.COLORS.GRAY_300};
    font-family: ${({theme}) =>  theme.FONT_FAMILY.REGULAR};

`