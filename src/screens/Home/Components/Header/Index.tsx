import { Container, Cash, Wrapper } from "./styles";
import { Money } from "phosphor-react-native";
import { useNavigation } from '@react-navigation/native'
import { useContext, useState } from "react";
import { ContextProvider } from "../../../../contexts/Context";;


export function Header(){
    return (
        <Wrapper>
            <Container>
                <Money size={30} color="#fff"/>
                <Cash>R$ 150</Cash>
            </Container>
        </Wrapper>
    )
}