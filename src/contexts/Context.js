import { createContext,  useState } from "react";


export const ContextProvider = createContext({})

export default function Provider({children}){
    const [user, setUser] = useState({})
    const [itemSelected, setItemSelected] = useState();
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState([]);
    const [paymentOrAdress, setPaymentOrAdress] = useState('');
    const [tag, setTag] = useState('')
    const [lastSearched, setLastSearched] = useState('')

    function mergeDuplicates(array) {
        const itemMap = {};
        array.forEach(item => {
          const key = item.id;
          const total = parseFloat(item.total);
          if (itemMap[key]) {
            itemMap[key].total += total;
          } else {
            itemMap[key] = { ...item, total };
          }
        });
        const mergedArray = Object.values(itemMap);
        return mergedArray;
    }

    const totalSumCart = cart.reduce((acc, item) => acc + parseFloat(item.total), 0);
    return (
        <ContextProvider.Provider value={{ 
            user, 
            setUser,
            search,
            setSearch,
            itemSelected,
            setItemSelected,
            cart,
            setCart,
            paymentOrAdress,
            setPaymentOrAdress,
            tag,
            setTag,
            mergeDuplicates,
            totalSumCart
        }}>
            {children}
        </ContextProvider.Provider>
    )
}