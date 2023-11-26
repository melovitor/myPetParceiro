import { TouchableOpacityProps  } from "react-native";
import { Illustration, Wrapper,Text } from "./styles";
import { useNavigation } from "@react-navigation/native";


type CarProps = TouchableOpacityProps & {
    title: string;
    src: any
    type?: 'PRIMARY' | 'SECONDARY';
}

export function Card({title, src, type = 'PRIMARY',  ...rest}:CarProps){
    const navigation = useNavigation()
    return (
        <Wrapper type={type} {...rest} >
            <Illustration  source={src} resizeMode="contain"/>
            <Text>{title}</Text>
        </Wrapper>
    )
}

