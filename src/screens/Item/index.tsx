import { Header } from "../../components/Header";
import { Banner, BannerContainer, Brand, Button, ButtonContainer, ButtonText, Container, Counter, CounterContainer, InfoContainer, Name, OptionsContainer, PriceAndAddButtonContainer, Size, SizeContainer, SizeText, Wrapper } from "./styles";
import { useNavigation } from '@react-navigation/native'
import {useContext, useEffect, useState} from 'react'

import BannerImg from '../../assets/items/racao.png'
import { Minus, Plus } from "phosphor-react-native";
import { Alert, FlatList, TouchableOpacity } from "react-native";
import { ContextProvider } from "../../contexts/Context";
import { priceFormatter } from "../../utils/formatter";
import { connectFirestoreEmulator, count } from "firebase/firestore";
import { updateItemValue } from "../../../firebaseConfig";

const STATUS = [
    { text: 'Preparando', color: '#6495ED' },
    { text: 'Saiu para entrega', color: '#A0CBFF' },
    { text: 'Entregue', color: '#00B37E' },
    { text: 'Destinatario ausente', color: '#FF4D4F' }
]

export function Item() {
    const { itemSelected } = useContext(ContextProvider);
    const [selectedStatus, setSelectedStatus] = useState(itemSelected.status);
  
    const navigation = useNavigation();
  
    async function handleStatusChange(index){
      setSelectedStatus(index);
        console.log(itemSelected.id, index)
      await updateItemValue(itemSelected.id, index)
    };
  
    console.log(itemSelected);
  
    return (
      <Wrapper>
        <Header title="Item" />
        <Container>
          <BannerContainer>
            <Banner source={{ uri: itemSelected.image }} resizeMode="contain" />
          </BannerContainer>
          <InfoContainer>
            <Brand>{itemSelected.brand}</Brand>
            <Name>{itemSelected.name}</Name>
            <OptionsContainer>
              <Brand>Status do pedido</Brand>
              <SizeContainer>
                <FlatList
                  data={STATUS}
                  renderItem={({ item, index }) => (
                    <Size onPress={() => handleStatusChange(index)} selected={selectedStatus === index}>
                      <SizeText selected={selectedStatus === index}>{item.text}</SizeText>
                    </Size>
                  )}
                  keyExtractor={(item) => item.text}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </SizeContainer>
              <Brand>Quantidade</Brand>
              <SizeContainer>
                <Counter>{itemSelected.quantity} x</Counter>
                <Size onPress={() => {}} selected={true}>
                  <SizeText selected={true}>{itemSelected.size}</SizeText>
                </Size>
              </SizeContainer>
              <PriceAndAddButtonContainer>
                <Name>{priceFormatter.format(itemSelected.price)}</Name>
                <CounterContainer>{/* Adicione sua lógica aqui, se necessário */}</CounterContainer>
              </PriceAndAddButtonContainer>
            </OptionsContainer>
          </InfoContainer>
        </Container>
      </Wrapper>
    );
  }