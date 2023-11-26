import { Container, SubTitle, Title, Illustration, NextButton, NextButtonContainer} from './styles';
import  Logo  from '../../assets/Illustration.png';
import { useNavigation } from '@react-navigation/native'
import { CaretRight } from 'phosphor-react-native';


export function Onbording(){
    const navigation = useNavigation()

    function handleInit(){
        navigation.navigate('signUp')
    }

    return (
        <Container>
            <Title>O seu pet shop com mais visibilidade, pelo menor preço!</Title>
            <Illustration  source={Logo} resizeMode="contain"/>
            <SubTitle>Venda seus produtos para pet de forma fácil e rápida!</SubTitle>
            <NextButtonContainer>
                <NextButton onPress={handleInit}>
                    <CaretRight  size={32} weight="bold" color='#fff'/>
                </NextButton>
            </NextButtonContainer>
        </Container>
        
    )
}