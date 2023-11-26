import { Container, Text } from "./styles"
import { useNavigation } from '@react-navigation/native'
import { CardSettings } from "../../components/CardSettings";
import * as Icon from "phosphor-react-native";
import { Alert } from "react-native"

import { getAuth, signOut } from "firebase/auth";
import {auth} from '../../../firebaseConfig'
import { useContext } from "react";
import { ContextProvider } from "../../contexts/Context";



export function Settings(){
    const navigation = useNavigation()
    const {setPaymentOrAdress} = useContext(ContextProvider)
 


    function hendleChangePassword(){
        navigation.navigate("changePassword")
    }
    function hendlePaymentOrAdress(){
        navigation.navigate("listAdressOrPayments")
    }

    function hendleSignOut(){
        Alert.alert('Sair', 'Deseja sair do aplicativo?' ,[
            {
              text: 'Não',
              onPress: () => null,
            },
            {
                text: 'Sair', 
                onPress: () => signOut(auth),
                style: 'destructive',
            },
          ]);        
    }


    return(
        <Container>
            <Text>Configurações</Text>
            <CardSettings 
                title="Pagamentos" 
                subTitle="meus cartões" 
                icon={<Icon.CreditCard   weight="light"/>}
                onPress={() => {hendlePaymentOrAdress(); setPaymentOrAdress('Payment')}}/>

            <CardSettings 
                title="Endereços" 
                subTitle="meus endereços"  
                icon={<Icon.House   weight="light"/>}
                onPress={() => {hendlePaymentOrAdress(); setPaymentOrAdress('Adress')}}/>


            <CardSettings 
                title="Senha" 
                subTitle="Altere sua senha" 
                icon={<Icon.Lock weight="light"/>}
                onPress={hendleChangePassword}/>
            <CardSettings 
                title="Pedidos realizados" 
                subTitle="Vejá seu histórico de pedidos" 
                icon={<Icon.ListChecks weight="light"/>}
                onPress={() => {navigation.navigate("orders")}}/>
            
            <CardSettings 
                title="Sair" 
                subTitle="Sair do aplicativo" 
                icon={<Icon.SignOut  weight="light"/>}
                onPress={hendleSignOut}/>
            
        </Container>
    )
}