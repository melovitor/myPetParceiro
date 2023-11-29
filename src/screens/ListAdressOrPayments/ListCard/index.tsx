import { CreditCard, House } from "phosphor-react-native";
import { TouchableOpacity  } from 'react-native';
import { Title, Container, Subtitle, Wrapper } from "./styles";

type Props = {
    payment?: boolean
    surname: string,
    info: string,
    onPress: () => void;
}

export function LisCard({surname, info, payment=true, onPress}: Props) {
    return (
        <TouchableOpacity onPress={onPress}> 
        <Wrapper>
            {payment === true ?
                <CreditCard/>
                :
                <House/>
            }
            <Container>
                <Title>{surname}</Title>
                <Subtitle>{info}</Subtitle>

            </Container>

        </Wrapper>
        </TouchableOpacity>
    )

}