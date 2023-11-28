import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Wrapper = styled(SafeAreaView)`
    background: ${({theme}) =>  theme.COLORS.WHITE};
    flex: 1;
`
export const Container = styled.View`
    width: 100%;
    height: 100%;
    padding: 16px;
    gap: 16px;
    align-items: center;
    margin-bottom: 100px;

`
export const ContainerWrapper = styled.ScrollView`

`

export const Image = styled.Image`
    width: 150px;
    height: 150px;
    border-radius: 10px;
`
export const SizeContainer = styled.View`
    width: 100%;
    flex-direction: row;
    gap: 8px;
`

export const RemoveSize = styled(TouchableOpacity)`
    justify-content: center;
`

export const SizeText = styled.Text`
    color: ${({theme}) =>  theme.COLORS.GRAY_300};
    font-weight: bold;
`
