import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "../screens/SignIn";
import { Onbording } from "../screens/Onbording";
import { SignUp } from "../screens/SignUp";

const {Navigator, Screen} = createNativeStackNavigator()

export function AuthRoutes(){
    return(
        
        <Navigator screenOptions={{headerShown: false}}>
            <Screen 
                name="onbording"
                component={Onbording}
            />
            <Screen 
                name="signIn"
                component={SignIn}
            />
            <Screen 
                name="signUp"
                component={SignUp}
            />
        </Navigator>
        
    )
}