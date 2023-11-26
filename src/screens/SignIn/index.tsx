import { useState, useRef } from 'react'
import { ScrollView, Alert, TextInput } from "react-native";
import { InputContainer, Wrapper, Text, ButtonContainer, SignUpContainer } from "./styles";
import { InitialHeader } from "../../components/InitialHeader";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native'
import {auth} from '../../../firebaseConfig'

export function SignIn(){
    const passwordRef = useRef<TextInput | null>(null);
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(Boolean)

    function hendleSignIn(){
        if(!email || !password){
            return Alert.alert('Entrar', 'Informe e-mail e senha.')
        }

        setIsLoading(true)
        signInWithEmailAndPassword(auth ,email, password)
        .then(() => {
            setIsLoading(false)

        })
        .catch((error) => {
            if(error.code ===  'auth/user-not-found' || error.code === 'auth/wrong-password'){
                setIsLoading(false)
                return Alert.alert('Entrar', 'E-mail ou senha inválida.')
            }
            if(error.code === 'auth/invalid-email'){
                setIsLoading(false)
                return Alert.alert('Entrar', 'E-mail inválido.')
            }
            if(error.code === 'auth/network-request-failed'){
                setIsLoading(false)
                return Alert.alert('Entrar', 'Não foi possivel conectar ao servidor, verifique sua internet.')
            }if(error.code === 'auth/network-request-failed'){
                setIsLoading(false)
                return Alert.alert('Entrar', 'Não foi possivel conectar ao servidor, verifique sua internet e tente novamente.')
            }
            console.log(error)
            return Alert.alert('Entrar', 'Não foi possivel acessar.')
        }) 
    }

    function hendleSignUp(){
        navigation.navigate("signUp")
    }

    return (
        <Wrapper>
            <InputContainer>
                <InitialHeader title='Olá, Bem vindo!' subTitle='O que acha de entrar e dar uma olhada em como anda suas vendas1?'/>
                <Input 
                    placeholder="E-mail" 
                    onChangeText={setEmail} 
                    keyboardType='email-address' 
                    autoCapitalize='none'
                    returnKeyType="next"
                    onSubmitEditing={() => {passwordRef.current ? passwordRef.current.focus(): {}}}
                />
                <Input 
                    placeholder="Senha" 
                    secureTextEntry 
                    onChangeText={setPassword} 
                    onSubmitEditing={hendleSignIn}
                    autoCapitalize='none'
                    inputRef={passwordRef}
                />
            </InputContainer>
            <ButtonContainer>
                <Button title="Entrar" type="PRIMARY" style={{marginTop: 16}} onPress={hendleSignIn} loading={isLoading}/>
                <SignUpContainer>
                    <Text>Ainda não criou sua conta?</Text>
                    <Button title="Criar conta" type="SECONDARY" onPress={hendleSignUp}/>
                </SignUpContainer>
            </ButtonContainer>
        </Wrapper>
        
    )
}