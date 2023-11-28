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

const status = ['Preparando', 'Saiu para entrega', 'Entregue', 'Cancelado']
const selectedItem = ['1Kg']

export function Item(){
    const { itemSelected, cart, setCart } = useContext(ContextProvider)   

    const navigation = useNavigation()
    const [Count, setCount] = useState(1)    
    const [unitValue, setUnitValue] = useState()
    const [selectedSize, setSelectedSize] = useState('')
    const [price, setPrice] = useState(0)


    useEffect(() => {
        const fistItem = itemSelected.sizes[0]
        handlePrice(fistItem)
    }, [itemSelected]) 
    

    function handlePrice(item){
        setSelectedSize(item.size)
        setPrice(item.value)
        setUnitValue(item.value)
    }

    return (
        <Wrapper>
            <Header title="Item" />
            <Container>
                <BannerContainer>
                    <Banner source={{ uri: itemSelected.image }} resizeMode="contain"/>
                </BannerContainer>
                <InfoContainer>
                    <Brand>{itemSelected.brand}</Brand>
                    <Name>{itemSelected.name}</Name>
                    <OptionsContainer>
                        <Brand>Status do pedido</Brand>
                        <SizeContainer>
                            <FlatList
                                data={status}
                                renderItem={({item, index  }) => 
                                <Size  onPress={() => handlePrice(item)}  selected={true}>
                                    <SizeText selected={true} > {status[index]}</SizeText>
                                </Size>
                                } 
                                key={itemSelected.sizes}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </SizeContainer>
                        <Brand>Quantidade</Brand>
                        <SizeContainer>
                        <Counter>{Count} x</Counter>
                            <FlatList
                                data={selectedItem}
                                renderItem={({item, index}) => 
                                <Size  onPress={() => handlePrice(item)}  selected={true}>
                                    <SizeText selected={true} >{ selectedItem[index] }</SizeText>
                                </Size>
                                } 
                                key={itemSelected.sizes}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </SizeContainer>
                            <PriceAndAddButtonContainer>
                            <Name>{priceFormatter.format(price)}</Name>
                            <CounterContainer>
                                    
                                </CounterContainer> 
                            </PriceAndAddButtonContainer>            
                    </OptionsContainer>
                </InfoContainer>
            </Container>
        </Wrapper>
    )
}