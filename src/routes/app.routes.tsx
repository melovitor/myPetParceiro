import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components';
import { ChangePassword } from '../screens/ChangePassword';
import { Home } from '../screens/Home';
import { Gear, House } from 'phosphor-react-native';
import { Settings } from '../screens/Settings';
import { Item } from '../screens/Item';
import { AddAdress } from '../screens/AddAdress';
import { StyleSheet } from 'react-native';
import { NewItem } from '../screens/NewItem';
import { ListAdressOrPayments } from '../screens/ListAdressOrPayments';
import { Search } from '../screens/Search';

const {Navigator, Screen} = createBottomTabNavigator<AppRouts>()

type AppRouts = {
    signIn: undefined,
    signUp: undefined,
    home: undefined,
    changePassword: undefined,
    cart: undefined,
    orders: undefined,
    settings: undefined,
    checkout:undefined,
    search:undefined,
    item:undefined,
    summary:undefined,
    services:undefined,
    addAdress:undefined,
    addPayment:undefined,
    listAdressOrPayments:undefined,
    editPayment:undefined,
    editAdress:undefined,
    newItem:undefined,
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRouts>

export function AppRoutes(){
    const {COLORS} = useTheme()
    const styles = StyleSheet.create({
        shadow: {
            shadowColor: COLORS.BLUE_500,
            shadowOffset: {
                width: 0,
                height: 10
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 5
        }
    })


    return(        
            <Navigator screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: COLORS.BLUE_500,
                tabBarInactiveTintColor: COLORS.GRAY_300,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 8,
                    left: 10,
                    right: 10, 
                    backgroundColor: COLORS.WHITE,
                    height: 75,
                    borderRadius: 15,
                    borderTopWidth:0,
                    ...styles.shadow
                }
            }}>
            <Screen
                name='home'
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <House color={color} size={32}/>
                    )
                }}
            />
            <Screen
                name='settings'
                component={Settings}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Gear color={color}  size={32}/>
                    )
                }}
            />
            <Screen
                name='changePassword'
                component={ChangePassword}
                options={{
                    tabBarButton: () => null
                }}
            />
            <Screen
                name='item'
                component={Item}
                options={{
                    tabBarButton: () => null
                }}
            />
            <Screen
                name='listAdressOrPayments'
                component={ListAdressOrPayments}
                options={{
                    tabBarButton: () => null
                }}
            />
            <Screen
                name='addAdress'
                component={AddAdress}
                options={{
                    tabBarButton: () => null
                }}
            />
            <Screen
                name='newItem'
                component={NewItem}
                options={{
                    tabBarButton: () => null
                }}
            />
            <Screen
                name='search'
                component={Search}
                options={{
                    tabBarButton: () => null
                }}
            />
        </Navigator>
        
    )
}

