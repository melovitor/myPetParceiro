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
    size: string,
    to: string;
    key: string;
    from: string
}


export function CartItem({id, itemId, status, quantity, size, to, key,from}: ItemProps){
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
        from
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
    
    // function handleSelectedItem(){    
    //     setItemSelected({
    //         id,
    //         name,
    //         image,
    //         quantity,
    //         sizes,
    //         brand,
    //         owner
    //     });
    //     navigation.navigate("item")
    // }    

    return (
        <Wrapper >
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
                    {/* {priceFormatter.format(price)} */}
                </Amount>
            </Container>
        </Wrapper>
    )
}