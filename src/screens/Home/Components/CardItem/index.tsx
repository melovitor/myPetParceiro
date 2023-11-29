import { Amount, Container, Illustration, Wrapper,Text } from "./styles";
import { useNavigation } from '@react-navigation/native'
import { priceFormatter } from "../../../../utils/formatter"; 
import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../../../contexts/Context";
import { getItemById } from "../../../../../firebaseConfig";

interface ItemProps {
    id: string;
    itemId: string;
    status: number;
    quantity: number,
    size: number,
    to: string;
    key: string;
    from: string
    price: number
}



export function CartItem({id, itemId, status, quantity, size, to, key, from, price}: ItemProps){
    const navigation = useNavigation()
    const { setItemSelected } = useContext(ContextProvider)   
    const [itemData, setItemData] = useState({})
    const [userData, setUSerData] = useState({})

    useEffect(() => {
        console.log("cartItem: " ,
        id, 
        itemId, 
        status, 
        quantity, 
        size, 
        to,
        key,
        from,
        price
    )

    
    async function getItem(){
        setItemData(await getItemById(itemId, 'products'))
    }
    async function getUser(){
        setUSerData(await getItemById(from, 'users'))
    }

    getItem()
    getUser()
    }, [])
    
    function handleSelectedItem(){    
        setItemSelected({
            id,
            name: itemData?.name,
            image: itemData?.image,
            quantity,
            size,
            brand: itemData?.brand,
            owner: to,
            price,
            status
        });
        navigation.navigate("item")
    }    

    return (
        <Wrapper onPress={handleSelectedItem} >
            <Illustration source={{ uri:itemData?.image }} resizeMode="contain"/>
            <Container>  
                <Text>
                    {userData?.name}
                </Text> 
                <Text>
                   {`${userData?.rua}, ${userData?.numero}`}
                </Text>              
                <Text>
                    {itemData?.name}
                </Text>
                <Amount>
                    {priceFormatter.format(price)}
                </Amount>
            </Container>
        </Wrapper>
    )
}