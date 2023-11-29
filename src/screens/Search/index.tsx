import { FlatList } from "react-native";
import { Header } from "../Home/Components/Header/Index";
import { SearchCard } from "./SearchCard";
import { EmptyContainer, SubTitle, Title, Wrapper } from "./styles";
import { useContext, useEffect, useState } from "react";
import { getCurrentOrders } from "../../../firebaseConfig";
import { ContextProvider } from "../../contexts/Context";
import { idText } from "typescript";
import { CartItem } from "../Home/Components/CardItem";



export function Search(){
  const [data, setData] = useState([]);
  const {search, tag, user} = useContext(ContextProvider)
  const [getNewOrdersState, setGetNewOrdersState] = useState([])
    
  useEffect(() => {
    async function getNewOrdersOnDB(){
      setGetNewOrdersState(await getCurrentOrders(user.id));
      
  }
  getNewOrdersOnDB()
  console.log(getNewOrdersState)
  }, [])

 
    return (
    <Wrapper>
        <Header />
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
    </Wrapper>
  )
}