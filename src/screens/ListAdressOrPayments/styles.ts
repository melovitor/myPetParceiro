import styled from "styled-components/native"
import { SafeAreaView } from "react-native-safe-area-context"

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color:${({theme}) =>  theme.COLORS.WHITE};
    padding: 16px;
    gap: 16px;
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
`


