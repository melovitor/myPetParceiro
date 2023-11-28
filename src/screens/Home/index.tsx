import { Card } from "./Components/Card"
import { Header } from "./Components/Header/Index"
import { Wrapper, Text, ServicesCardContainer, Container, PetsCarrosel, IndicationsCardContainer, Title, ItemsCarrosel, WrapperAnimalCard, TitleAnimalCard } from "./styles"
import { useNavigation } from '@react-navigation/native'
import TaxiDog from '../../assets/taxidog.png'
import petShop from '../../assets/petshop.png'
import Wash from '../../assets/wash.png'
import { ImageAds } from "./Components/Ads/styles"
import AdsImg from '../../assets/ads.png'

import { CartItem } from "./Components/CardItem"
import { Cat, ListDashes, PlusCircle } from "phosphor-react-native"
import { useContext, useEffect, useState } from "react"
import { ContextProvider } from "../../contexts/Context"

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDocument, getFourItemsFromDb, getUser } from "../../../firebaseConfig"
import { FlatList } from "react-native"


export function Home(){
    const { setUser, setTag, setSearch } = useContext(ContextProvider) 
    const [getFourItems, setGetFourItens] = useState([])
    
    
    const [email, setEmail] = useState('');

    const auth = getAuth();

    useEffect(() => {
        setSearch('')
        const fetchUser = async () => {
            try {
                if (email) {
                    const userData = await getUser(email);
                    setUser(userData[0]);

                    if(!userData[0]) {
                        await addDocument({email}, 'users')
                        const userData = await getUser(email);
                        setUser(userData[0]);
                    }
                } 
            } catch (error) {
                console.log(error); 
            }
        };

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email);
            }
        });

        fetchUser();
        
        
    }, [email, setUser, auth]);
    async function getFour(){
        const fourItems = await getFourItemsFromDb();
        setGetFourItens(fourItems);
    }
    getFour()
    
    const navigation = useNavigation()
    return(
        <Wrapper>
            <Header/>
            <Container>
                <IndicationsCardContainer>
                    <Title>Novos pedidos</Title>
                    <FlatList
                        data={getFourItems}
                        renderItem={({ item }) => (
                            <CartItem
                                id={item.id}
                                image={item.data.image}
                                name={item.data.name}
                                price={item.data.sizes[0].value} 
                                key={item.id}
                                brand={item.data.brand}
                                owner={item.data.owner}
                                quantity={item.data.quantity}
                                sizes={item.data.sizes}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        />
                </IndicationsCardContainer>
                <PetsCarrosel>
                    <WrapperAnimalCard  onPress={() => {navigation.navigate('search'), setTag('dog')}}>
                        <PlusCircle  size={32}  color="#fff" weight="fill" />
                        <TitleAnimalCard>Adicionar produto</TitleAnimalCard>
                    </WrapperAnimalCard>
                    <WrapperAnimalCard  onPress={() => {navigation.navigate('search'), setTag('cat')}}>
                        <ListDashes  size={32}  color="#fff" weight="fill"/>
                        <TitleAnimalCard>Pedidos em andamento</TitleAnimalCard>
                    </WrapperAnimalCard>
                </PetsCarrosel>
            </Container>
        </Wrapper>
    )
}