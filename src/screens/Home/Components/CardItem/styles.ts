import styled from "styled-components/native";
import { Star } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

export const Wrapper = styled(TouchableOpacity)`
    width: 340px;
    height: 160px;
    margin: 8px;
    background: ${({theme}) => theme.COLORS.WHITE};
    border-radius: 15px;
    justify-content: start;
    align-items: center;
    gap: 8px;
    box-shadow: 4px 2px 2px ${({theme}) => theme.COLORS['GRAY_50']};
    flex-direction: row;
`

export const Illustration = styled.ImageBackground`
    width: 100px;
    height: 100px;
`

export const Container = styled.View`
    justify-content: center;
    align-items: start;
    gap: 4px;
`

export const Amount = styled.Text`
    color: ${({theme}) => theme.COLORS['BLUE_500']};
    font-weight: bold;
`

interface IconProps {
    type: 'FILL' | 'REGULAR'
}

export const StarIcon = styled(Star).attrs<IconProps>(props => ({
    color: props.type === 'FILL' ? props.theme.COLORS.YELLOW_500 : props.theme.COLORS.GRAY_100,
    size: 10,
    weight: props.type === 'FILL' ? 'fill' : 'regular'
  }))``