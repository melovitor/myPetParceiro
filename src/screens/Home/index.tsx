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
import { addDocument, getFourItemsFromDb, getNewOrders, getUser } from "../../../firebaseConfig"
import { FlatList } from "react-native"


export function Home(){
    const { setUser, setTag, setSearch, user } = useContext(ContextProvider) 
    const [getNewOrdersState, setGetNewOrdersState] = useState([])
    
    
    const [email, setEmail] = useState('');

    const auth = getAuth();

    useEffect(() => {
        setSearch('')
        const fetchUser = async () => {
            try {
                if (email) {
                    const userData = await getUser(email);
                    setUser(userData[0]);

                    // if(!userData[0]) {
                    //     await addDocument({email}, 'partnes')
                    //     const userData = await getUser(email);
                    //     setUser(userData[0]);
                    // }
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
    async function getNewOrdersOnDB(){
        setGetNewOrdersState(await getNewOrders(user.id));
        
    }
    getNewOrdersOnDB()
    
    const navigation = useNavigation()
    return(
        <Wrapper>
            <Header/>
            <Container>
                <IndicationsCardContainer>
                    <Title>Novos pedidos</Title>
                    <FlatList
                        data={getNewOrdersState}
                        renderItem={({ item }) => (
                            <CartItem
                                id={item.id}
                                itemId={item.data.itemId}
                                key={item.id}
                                to={item.data.to}
                                status={item.data.status}
                                quantity={item.data.quantity}
                                size={item.data.size}
                                from={item.data.from}
                                price={item.data.price}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        />
                </IndicationsCardContainer>
                <PetsCarrosel>
                    <WrapperAnimalCard  onPress={() => {navigation.navigate('newItem')}}>
                        <PlusCircle  size={32}  color="#fff" weight="fill" />
                        <TitleAnimalCard>Adicionar produto</TitleAnimalCard>
                    </WrapperAnimalCard>
                    <WrapperAnimalCard  onPress={() => {navigation.navigate('search')}}>
                        <ListDashes  size={32}  color="#fff" weight="fill"/>
                        <TitleAnimalCard>Pedidos em andamento</TitleAnimalCard>
                    </WrapperAnimalCard>
                </PetsCarrosel>
            </Container>
        </Wrapper>
    )
}