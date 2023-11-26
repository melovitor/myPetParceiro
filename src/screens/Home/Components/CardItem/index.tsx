import { Text, View } from "react-native";
import { Amount, Container, Illustration, Wrapper } from "./styles";
import { useNavigation } from '@react-navigation/native'
import { priceFormatter } from "../../../../utils/formatter"; 
import { useContext } from "react";
import { ContextProvider } from "../../../../contexts/Context";

interface ItemProps {
    name: string;
    image: string;
    quantity: number;
    sizes: [],
    brand: string,
    id: string;
    owner: string;
    price: string;
}
export function CartItem({name, image, quantity, sizes, brand, id, owner, price}: ItemProps){
    const navigation = useNavigation()
    const { setItemSelected } = useContext(ContextProvider)   

    function handleSelectedItem(){    
        setItemSelected({
            id,
            name,
            image,
            quantity,
            sizes,
            brand,
            owner
        });
        navigation.navigate("item")
    }    

    return (
        <Wrapper onPress={handleSelectedItem}>
            <Illustration source={{ uri:image }} resizeMode="contain"/>
            <Container>                
                <Text>
                    {name}
                </Text>
                <Amount>
                    {priceFormatter.format(price)}
                </Amount>
            </Container>
        </Wrapper>
    )
}