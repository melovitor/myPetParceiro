import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"

export const Wrapper = styled.View`
    flex: 1;
    background:  ${({theme}) =>  theme.COLORS.WHITE};
`
export const Container = styled.View`
    box-sizing: border-box;
    padding: 16px;
    gap: 32px;
    margin-top: 16px;
`

export const Text = styled.Text`
    color: ${({theme}) =>  theme.COLORS.GRAY_400};
    text-align: center;
    margin-bottom: 24px;
    margin-top: 48px;
`
export const ServicesCardContainer = styled.View`
    margin-top: 16px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const PetsCarrosel = styled.View`
    gap: 16px;
    align-items: center;
`
export const Title = styled.Text`
    color: ${({theme}) =>  theme.COLORS.GRAY_300};
    font-weight: bold;
    font-size: 20px;
`

export const IndicationsCardContainer = styled.View`
    gap: 16px;
    justify-content: center;
    align-items: start;
    max-height: 300px;
    height: 100%;
`

export const ItemsCarrosel = styled.ScrollView`
    height: 204px;
`

export const WrapperAnimalCard = styled(TouchableOpacity)`
    width: 100%;
    height: 100px;
    background: ${({theme}) => theme.COLORS.BLUE_500};
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    box-shadow: 4px 2px 2px ${({theme}) => theme.COLORS['GRAY_50']};
    margin: 0 16px;

`

export const TitleAnimalCard = styled.Text`
    color: ${({theme}) =>  theme.COLORS.WHITE};
    text-align: center;
`