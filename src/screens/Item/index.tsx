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

    function handleSelectedSize(){
        if(!price) {
            Alert.alert('Item', 'Ecolha uma opção do item antes de adicionar ao carrinho!' ,[
                {
                  text: 'Ok',
                  onPress: () => null,
                },
            ]); 

            return
        }
        const newitem = {
            id: itemSelected.id,
            name: itemSelected.name,
            size: selectedSize,
            unitValue,
            total: (price*Count).toFixed(2),
            image: itemSelected.image,
            quantity: Count,
            owner: itemSelected.owner,
        }

        setCart([...cart, newitem]);
        navigation.navigate('cart')
        
    }   
    

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
                        <Brand>Escolha uma opção</Brand>
                        <SizeContainer>
                            <FlatList
                                data={itemSelected.sizes}
                                renderItem={({item}) => 
                                <Size  onPress={() => handlePrice(item)}  selected={selectedSize === item.size}>
                                    <SizeText selected={selectedSize === item.size} >{ typeof item.size === "number" ? `${item.size}Kg` : item.size }</SizeText>
                                </Size>
                                } 
                                key={itemSelected.sizes}
                                horizontal
                            />
                        </SizeContainer>
                            <PriceAndAddButtonContainer>
                            <Name>{priceFormatter.format(price)}</Name>
                            <ButtonContainer> 
                                <CounterContainer>
                                    <TouchableOpacity onPress={() => {setCount(Count < 1 ? 0 : Count-1)}}>
                                        <Minus size={30} color="#7C7C8A"/>
                                    </TouchableOpacity>
                                    <Counter>{Count}</Counter>
                                    <TouchableOpacity onPress={() => {setCount(Count >= itemSelected.quantity  ?  itemSelected.quantity : Count+1 )}}>
                                        <Plus size={30} color="#6495ED"/>
                                    </TouchableOpacity>
                                </CounterContainer>
                                
                                <Button onPress={ handleSelectedSize }>
                                    <ButtonText>Adicionar</ButtonText>
                                    <ButtonText>{priceFormatter.format((price*Count).toFixed(2))}</ButtonText>
                                </Button>
                            </ButtonContainer>
                            </PriceAndAddButtonContainer>            
                    </OptionsContainer>
                </InfoContainer>
            </Container>
        </Wrapper>
    )
}