import { Amount, Container, Illustration, Info, Rating, StarIcon, Value, ValueInfo, Wrapper } from "./styles";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { priceFormatter } from "../../../utils/formatter";
import { useContext, useState } from "react";
import { ContextProvider } from "../../../contexts/Context";


type Props = {
    name: string;
    image: string;
    quantity: number;
    sizes: [],
    brand: string,
    id: string;
    owner: string
}

export function SearchCard({name, image, quantity, sizes, brand, id, owner}: Props){
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
    const smallestValue = Math.min(...sizes.map(item => item.value));

    return(
        <Wrapper onPress={handleSelectedItem}>
            <Illustration source={{ uri: image }}  resizeMode="contain"/>
            <Container>
                <Info>
                    <Text>
                        {name}
                    </Text>
                </Info>
                <View>
                    <ValueInfo>A partir de</ValueInfo>
                    <Value>{priceFormatter.format(smallestValue)}</Value>
                </View>
            </Container>
        </Wrapper>
    )
}