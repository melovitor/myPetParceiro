import { useNavigation } from "@react-navigation/native";
import { CaretLeft } from "phosphor-react-native"
import { BackButton, Container, Space, Title, TitlePage } from "./styles";
import { useContext } from "react";
import { ContextProvider } from "../../contexts/Context";

interface HeaderProps {
    title?: string
    removeItem?: boolean
}

export function Header({title, removeItem=false}: HeaderProps){
    const navigation = useNavigation()

    return (
        <Container>
            <BackButton onPress={() => {navigation.navigate('settings')}}>
                <CaretLeft size={32}/>
            </BackButton>
            <TitlePage>
                <Title>{title}</Title>
            </TitlePage>
            <Space></Space>
        </Container>
    )
}