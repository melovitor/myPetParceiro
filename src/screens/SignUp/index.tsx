import {useState, useRef} from 'react'
import { Alert, ScrollView, TextInput } from "react-native";
import { Wrapper, Text, InputContainer, ButtonContainer, SignInContainer } from "./styles";
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { InitialHeader } from '../../components/InitialHeader';
import { useNavigation } from '@react-navigation/native'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../../firebaseConfig'



export function SignUp(){
    const emailRef = useRef<TextInput | null>(null)
    const passwordRef = useRef<TextInput | null>(null)
    const confirmPasswordRef = useRef<TextInput | null>(null)
    
    const navigation = useNavigation()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(Boolean)


    function hendleSignIn(){
        navigation.navigate("signIn")
    }
    function hendleCreateNewUser(){
        if(!name || !email || !password || !confirmPassword){
            return Alert.alert('Criar conta','Todos os campos devem ser preenchidos.')
            
        }

        if(password.length < 6){
            return Alert.alert('Criar conta', 'A senha deve conter mais de 6 caracteres.')
        }

        if(password !== confirmPassword){
            return Alert.alert('Criar conta', 'As senhas devem ser iguais')
            
        }
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {setIsLoading(false)})
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                setIsLoading(false)
                Alert.alert('Criar conta', 'Este endereço de E-mail já está cadastrado.')
            }
            if(error.code === 'auth/invalid-email'){
                setIsLoading(false)
                return Alert.alert('Criar conta', 'E-mail inválido.')
            }
            if(error.code === 'auth/network-request-failed'){
                setIsLoading(false)
                return Alert.alert('Criar conta', 'Não foi possivel conectar ao servidor, verifique sua internet e tente novamente.')
            }
            console.log(error)
            return Alert.alert('Criar conta', 'Não foi possivel acessar.')
        });

    }


    return(
        <Wrapper>
            <InputContainer>
                <InitialHeader title="Criar nova conta"  subTitle="Registre-se agora e ofereça o melhor para seus clientes com praticidade e comodidade!"/>
                <Input 
                    placeholder="Nome" 
                    onChangeText={setName} 
                    onSubmitEditing={() => {emailRef.current ? emailRef.current.focus(): {}}}
                    autoCapitalize='none'
                    returnKeyType="next"
                />
                <Input 
                    placeholder="E-mail" 
                    onChangeText={setEmail} 
                    onSubmitEditing={() => {passwordRef.current ? passwordRef.current.focus(): {}}}
                    inputRef={emailRef}
                    autoCapitalize='none'
                    returnKeyType="next"
                />
                <Input 
                    placeholder="Senha" 
                    secureTextEntry 
                    onChangeText={setPassword} 
                    onSubmitEditing={() => {confirmPasswordRef.current ? confirmPasswordRef.current.focus(): {}}}
                    inputRef={passwordRef}
                    autoCapitalize='none'
                    returnKeyType="next"
                />
                <Input 
                    placeholder="Confirmar senha" 
                    secureTextEntry 
                    onChangeText={setConfirmPassword} 
                    onSubmitEditing={hendleCreateNewUser}
                    inputRef={confirmPasswordRef}
                    autoCapitalize='none'
                    returnKeyType="done"
                />
            </InputContainer>
            <ButtonContainer>
                <Button title="Criar e acessar" type="PRIMARY" style={{marginTop: 16}} onPress={hendleCreateNewUser} loading={isLoading}/>
                <SignInContainer>
                    <Text>Já tem uma conta?</Text>
                    <Button title="Ir para login" type="SECONDARY" onPress={hendleSignIn}/>
                </SignInContainer>
            </ButtonContainer>
        </Wrapper>        
    )
}