import styled from "styled-components/native";
import { Heart, ShoppingCart } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

export const Wrapper = styled.View`
    width: 100%;
    height: 120px;
    align-items: start;
    justify-content: flex-end;
    background:  ${({theme}) =>  theme.COLORS['BLUE_500']};
    border-radius: 10px;
    padding: 16px;
    
`
export const Container = styled.View`
    height: 40px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-left: 8px;
`

export const Cash = styled.Text`
    font-size: 20px;
    color:  ${({theme}) =>  theme.COLORS['WHITE']};
    font-weight: bold;
` 
