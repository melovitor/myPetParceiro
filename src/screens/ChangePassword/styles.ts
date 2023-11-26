import styled from "styled-components/native"
import { SafeAreaView } from "react-native-safe-area-context"

export const Wrapper = styled(SafeAreaView)`
    flex: 1;
    gap: 16px;
    padding: 16px;
    background: ${({theme}) =>  theme.COLORS.WHITE};
`
export const Container = styled.View`
    padding-bottom: 96px;
    gap: 16px;
    height: 100%;
    justify-content: space-between;
`

export const Text = styled.Text`
    color: ${({theme}) =>  theme.COLORS.GRAY_400};
    text-align: center;
    margin-bottom: 24px;
    margin-top: 48px;
`

export const InputContainer = styled.View`
    gap: 16px;
`


export const Title = styled.Text`
    display: flex;
    text-align: center;
    font-size: 24px;
    margin: 16px 0;
`