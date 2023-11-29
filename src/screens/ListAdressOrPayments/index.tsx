import React, { useState, useEffect } from 'react';
import { Container } from "./styles";
import { useNavigation, useFocusEffect, NavigationProp } from "@react-navigation/native";
import { Header } from "../../components/Header";
import { useContext } from "react";
import { ContextProvider } from "../../contexts/Context";
import { LisCard } from "./ListCard";
import { Alert, FlatList, View } from "react-native";
import { Button } from "../../components/Button";
import { auth, db } from '../../../firebaseConfig';
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

export function ListAdressOrPayments(){
    
    type RootStackParamList = {
        addPayment: { itemId: string };
        addAdress: { itemId: string };
        editPayment: { itemId: string };
        editAdress: { itemId: string };
    };
      
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
      
    const { paymentOrAdress } = useContext(ContextProvider);
    const [data, setData] = useState([]);

    function ItemSeparator() {
        return (
            <View style={{ height: 10 }} />
        );
    }
    
    function handleAdd(){
        if (paymentOrAdress === 'Payment') {
            navigation.navigate('addPayment');
        } else {
            navigation.navigate('addAdress');
        }
    }

    function maskCardNumber(cardNumber: string) {
        const last4Digits = cardNumber.slice(-4);
        const maskedSection = cardNumber.slice(0, -4).replace(/\d/g, "*");
        return `${maskedSection}${last4Digits}`;
    }

    function handleCardOptions(card) {

        Alert.alert(
            paymentOrAdress === 'Payment' ? "Opções do Cartão" : "Opções do Endereço", // Título do alerta
            "Escolha uma opção", // Mensagem
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Editar",
                    onPress: () => editItem(card)
                },
                {
                    text: "Excluir",
                    onPress: () => deleteItem(card),
                    style: "destructive"
                }
            ]
        );
    }

    function editItem(item: { id: any; }) {
        console.log("Editar Item:", item);
        const navigationParam = paymentOrAdress === 'Payment' ? 'editPayment' : 'editAdress'
        navigation.navigate(navigationParam, { itemId: item.id.toString() });
    }
    
    async function deleteItem(item: any) {
        const collection = paymentOrAdress === 'Payment' ? 'cards' : 'addresses'
        // Deletar o cartão do banco de dados
        const itemRef = doc(db, collection, item.id);
        await deleteDoc(itemRef);
    
        // Atualizar o estado para remover o cartão da FlatList
        setData(previousData => previousData.filter(element => element.id !== item.id));
    }

    async function getUserCards(userId: unknown) {
        const cardData = [];
        const cardCollection = collection(db, 'cards');
        const q = query(cardCollection, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            cardData.push({surname: doc.data().nomeTitular, info: maskCardNumber(doc.data().numeroCartao), id: doc.id});
        });
        return cardData;
    }

    async function getUserAddresses(userId: unknown) {
        const addressData = [];
        const addressCollection = collection(db, 'addresses'); 
        const q = query(addressCollection, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const address = doc.data();
            addressData.push({
                surname: address.apelidoEndereco,
                info: `${address.rua}, ${address.numero}`, 
                id: doc.id
            });
        });
        return addressData;
    }

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                const userId = auth.currentUser.uid;
    
                if (paymentOrAdress === 'Payment') {
                    const userCards = await getUserCards(userId);
                    setData(userCards);
                } else {
                    const userAddresses = await getUserAddresses(userId);
                    setData(userAddresses);
                }
            };
    
            fetchData();
        }, [paymentOrAdress])
    );
    
    
    return (
        <Container>
            <Header title={paymentOrAdress === 'Payment' ? 'Pagamentos' : 'Endereços'} />
            <FlatList
                data={data}
                renderItem={({ item }) => 
                    <LisCard 
                        surname={item.surname}
                        info={item.info}
                        payment={paymentOrAdress === 'Payment'} 
                        onPress={() => handleCardOptions(item)}
                    />
                }
                keyExtractor={(item, index) => index.toString()}
                style={{ width: '100%', marginBottom: 10 }}
                ItemSeparatorComponent={ItemSeparator} 
                
            />

            <Button 
                style={{ marginBottom: 60 }}
                title={paymentOrAdress === 'Payment' ? 'Adicionar pagamento' : 'Adicionar endereço'}
                onPress={handleAdd}
            />
        </Container>
    )
}
