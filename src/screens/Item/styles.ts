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

`


export const BannerContainer = styled.View`
    width: 100%;
    height: 300px;
    justify-content: center;
    align-items: center;
    padding: 32px;
`

export const Banner = styled.Image`
    width: 250px;
    height: 250px;
`

export const InfoContainer = styled.View`
    width: 100%;
    gap: 8px;
`

export const Brand = styled.Text`
    color: ${({theme}) =>  theme.COLORS.GRAY_300};
    font-weight: bold;
`

export const Name = styled.Text`
    color: ${({theme}) =>  theme.COLORS.GRAY_600};
    font-weight: bold;
    font-size: 22px;
`
export const OptionsContainer = styled.View`
    margin-top: 32px;
    border-radius: 10px;
    border: 1px solid ${({theme}) =>  theme.COLORS.GRAY_100};
    width: 100%;
    padding: 16px;
    gap: 16px;
`

export const SizeContainer = styled.View`
    flex-direction: row;
    gap: 16px;
`

interface SizeOptions {
    selected?: boolean;
}

export const Size = styled(TouchableOpacity)<SizeOptions>`
    background: ${({ theme, selected }) => selected ? theme.COLORS.BLUE_300 : theme.COLORS.WHITE};
    max-width: 100px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    border-radius: 10px;
    border: 2px solid ${({ theme, selected }) => selected ? theme.COLORS.BLUE_500 : theme.COLORS.GRAY_200};
    margin-left: 8px;

`

export const SizeText = styled.Text<SizeOptions>`
    font-size: 12px;
    color: ${({ theme, selected }) => selected ? theme.COLORS.BLUE_500 : theme.COLORS.GRAY_200};
    font-weight: bold;
    text-align: center;
`

export const PriceAndAddButtonContainer = styled.View`
    width: 100%;
`

export const ButtonContainer = styled.View`
    flex-direction: row;
    margin-top: 32px;
    justify-content: space-between;
`

export const Button = styled(TouchableOpacity)`
    border-radius: 10px;
    background: ${({theme}) => theme.COLORS.BLUE_500};
    padding: 16px;
    justify-content: space-between;
    flex-direction: row;
    gap: 16px;
    
`

export const ButtonText = styled.Text`
    color: ${({theme}) => theme.COLORS.WHITE};
    font-weight: bold;
    font-size: 18px;
`

export const CounterContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4px;
`

export const Counter = styled.Text`
    font-size: 32px;
    color: ${({theme}) => theme.COLORS.GRAY_700};

`