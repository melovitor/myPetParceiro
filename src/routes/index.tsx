import { AuthRoutes } from './auth.routes' 
import { AppRoutes } from './app.routes'
import { useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from '../../firebaseConfig'; 

export function Routes(){
    const [user, setUser] = useState<any>()

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, response => setUser(response))

        return subscriber
    },[])

    return(                 
        <NavigationContainer>
            {user ? <AppRoutes/> : <AuthRoutes/>}
        </NavigationContainer>
    )

}