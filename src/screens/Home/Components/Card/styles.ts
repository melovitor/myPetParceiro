import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
interface CardProps  {
    type: string;
}

export const Wrapper = styled(TouchableOpacity)<CardProps>`
    width: 100px;
    height: 100px;
    background: ${({theme, type}) => type === 'PRIMARY' ? theme.COLORS.WHITE : theme.COLORS.BLUE_500};
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    box-shadow: 4px 2px 2px ${({theme}) => theme.COLORS['GRAY_50']};
    margin: 0 16px;

`

export const Illustration = styled.ImageBackground`
    width: 64px;
    height: 64px;
`

export const Text = styled.Text`
    color: ${({theme}) =>  theme.COLORS.GRAY_400};
    text-align: center;
`