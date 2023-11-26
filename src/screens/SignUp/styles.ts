import styled from "styled-components/native"
import { SafeAreaView } from "react-native-safe-area-context"


export const Wrapper = styled(SafeAreaView)`
    flex: 1;
    padding: 64px 16px 128px 16px;
    gap: 16px;
    justify-content: space-between;
    background: ${({theme}) =>  theme.COLORS.WHITE};
`

export const InputContainer = styled.View`
    gap: 16px;
`

export const ButtonContainer = styled.View` 
    gap: 16px;
`

export const Text = styled.Text`
    color: ${({theme}) =>  theme.COLORS.GRAY_400};
    text-align: center;
    font-family: ${({theme}) =>  theme.FONT_FAMILY.REGULAR};
`

export const SignInContainer = styled.View`
    gap: 8px;
`