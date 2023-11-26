import { Text } from "react-native";
import { useState } from 'react';
import { auth, db } from '../../../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, DateAndCVV, Title } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../../components/Header";

export function AddAdress(){
    
    const navigation = useNavigation()

    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');
    const [apelido, setApelido] = useState('');

    function maskCEP(value: string): string {
        return value
            .replace(/\D/g, '')             // Remove todos os caracteres que não são dígitos
            .replace(/(\d{5})(\d)/, '$1-$2')  // Insere o "-" depois do quinto dígito
            .slice(0, 9);                   // Trunca o valor para caber no formato #####-###
    }

    function handleCEPChange(value: string) {
        const maskedValue = maskCEP(value);
        setCep(maskedValue);
    }
    
    async function handleAddAddress() {
        try {
            const userId = auth.currentUser.uid;
            
            // Adicionando o novo endereço ao Firestore
            await addDoc(collection(db, 'addresses'), {
                rua: rua,
                numero: numero,
                cep: cep,
                apelidoEndereco: apelido,
                userId: userId
            });
            
            navigation.navigate('listAdressOrPayments');
        } catch (error) {
            console.error("Erro ao adicionar o endereço: ", error);
        }
    }

    return (
        <Container>
            <Header title="Adicionar endereço"/>
            <Title>Adicionar novo endereço</Title>
            <Input 
                placeholder="Rua" 
                value={rua}
                onChangeText={setRua}
            />
            <DateAndCVV>
                <Input 
                    placeholder="Numero" 
                    keyboardType="numeric"
                    value={numero}
                    onChangeText={setNumero}
                />
                <Input 
                    placeholder="CEP" 
                    keyboardType="numeric"
                    value={cep}
                    onChangeText={handleCEPChange}
                    />
            </DateAndCVV>
            <Input 
                placeholder="Apelido do endereço"
                value={apelido}
                onChangeText={setApelido}
            />
            <Button onPress={handleAddAddress} title="Adicionar endereço"/>
        </Container>
    )
}