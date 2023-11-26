import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {TouchableOpacity} from 'react-native'


export const Container = styled(SafeAreaView)`
    flex: 1;
    justify-content: center ;
    padding: 16px;
    background: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.COLORS.GRAY_700};
    font-size: ${({ theme}) => theme.FONT_SIZE.XXL}px;
    font-family: ${({ theme })=> theme.FONT_FAMILY.BOLD};
    margin-bottom: 16px;
    text-align: center;
`;

export const Illustration = styled.ImageBackground`
    width: 100%;
    height: 300px;
    margin-bottom: 8px;
`

export const SubTitle = styled.Text`
    color: ${({ theme }) => theme.COLORS.GRAY_300};
    font-size: ${({ theme}) => theme.FONT_SIZE.MD}px;
    font-family: ${({ theme })=> theme.FONT_FAMILY.REGULAR};
    margin-bottom: 52px;
`

export const NextButtonContainer = styled.View`
   border-radius: 999px;
   padding: 8px;
   justify-content: center;
   align-items: center;
`

export const NextButton = styled(TouchableOpacity)`
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.COLORS.BLUE_500};
    border-radius: 999px;
    width: 50px;
    height: 50px;
    padding: 8px;
`
