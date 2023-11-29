import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Star } from "phosphor-react-native";

export const Wrapper = styled(TouchableOpacity)`
    width: 100%;
    height: 88px;
    background: ${({theme}) =>  theme.COLORS['GRAY_50']};
    border-radius: 10px;
    padding: 8px;
    box-sizing: border-box;
    justify-content: start;
    align-items: center;
    gap: 16px;
    flex-direction: row;
    margin-bottom: 16px;
`

export const Illustration = styled.Image`
    width: 80px;
    height: 80px;
`

export const Rating = styled.View`
    flex-direction: row;
`

export const Container = styled.View`
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    gap: 4px;
    width: 240px;
`

export const Info = styled.View`
    gap: 16px;
`

export const Value = styled.Text`
    color: ${({theme}) => theme.COLORS['BLUE_500']};
    font-weight: bold;
`

export const ValueInfo = styled.Text`
    font-size: 10px;
    color: ${({theme}) => theme.COLORS['GRAY_300']};
`

interface IconProps {
    type: 'FILL' | 'REGULAR'
}

export const StarIcon = styled(Star).attrs<IconProps>(props => ({
    color: props.type === 'FILL' ? props.theme.COLORS.YELLOW_500 : props.theme.COLORS.GRAY_200,
    size: 12,
    weight: props.type === 'FILL' ? 'fill' : 'regular'
  }))``