import {useRef, useState} from 'react'
import { Alert, ScrollView, TextInput } from "react-native";
import { Wrapper, Text, Title, InputContainer, Container } from "./styles";
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { InitialHeader } from '../../components/InitialHeader';
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';
import { getAuth } from "firebase/auth";
import { Header } from '../../components/Header';


export function ChangePassword(){
    const confirmPasswordRef = useRef<TextInput | null>(null);
    const navigation = useNavigation()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    

    function hendleChangePassword(){
        const auth = getAuth();
        
        setIsLoading(true) 
        if(password.length < 6){
            setIsLoading(false)
            return Alert.alert('Trocar senha', 'A senha deve conter mais de 6 caracteres.')
        }

        if(password !== confirmPassword){
            setIsLoading(false)
            return Alert.alert('Trocar senha', 'As senhas devem ser iguais.')
        }

        // const user = auth.currentUser; /// Nao funciona, ajustar 
        // user.updatePassword(password)
        // .catch(error => {
        //     if(error.code === 'auth/network-request-failed'){
        //         return Alert.alert('Trocar senha', 'Não foi possivel conectar ao servidor, verifique sua internet e tente novamente.')
        //     }
        // })  
        setIsLoading(false)        
    }

    function hendleGoBack(){
        navigation.navigate('settings')
    }


    return(
        <Wrapper>
            <Header title='senha'/>
            <Container>
                <InputContainer>
                <Title>Deseja trocar sua senha?</Title>
                    <Input 
                        placeholder="Nova senha" 
                        secureTextEntry 
                        onChangeText={setPassword}
                        autoCapitalize='none'
                        returnKeyType="next"
                        onSubmitEditing={() => {confirmPasswordRef.current ? confirmPasswordRef.current.focus(): {}}}
                    />
                    <Input 
                        placeholder="Confirme nova senha" 
                        secureTextEntry 
                        autoCapitalize='none'
                        onChangeText={setConfirmPassword}
                        inputRef={confirmPasswordRef}
                    />
                </InputContainer>
                <Button title="Trocar senha" type="PRIMARY" style={{marginTop: 16}} onPress={hendleChangePassword} loading={isLoading}/>
            </Container>
        </Wrapper>
        
    )
}