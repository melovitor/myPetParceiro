import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Header } from '../../components/Header';
import { Container, Wrapper, ContainerWrapper, SizeText, SizeContainer, RemoveSize, Image } from './styles';
import { Minus } from 'phosphor-react-native';
import { ContextProvider } from '../../contexts/Context';
import {  addDocument, uploadImageAsync } from '../../../firebaseConfig';

export function NewItem() {
    const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/4211/4211547.png');
    const [sizes, setSizes] = useState([{ size: '', value: '' }]);
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [animal, setAnimal] = useState('');
    const [category, setCategory] = useState('');
    const [itemId, setItemId] = useState('image');
    const [itemData, setItemData] = useState({});
    const navigation = useNavigation()

    const { user } = useContext(ContextProvider) 
  
    const handleImagePicker = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        aspect: [4, 4],
        allowsEditing: true,
        base64: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
  
    const handleAddSize = () => {
      setSizes([...sizes, { size: '', value: '' }]);
    };
  
    const handleRemoveSize = (index) => {
      const newSizes = [...sizes];
      newSizes.splice(index, 1);
      setSizes(newSizes);
    };
  
    const handleSizeChange = (index, key, text) => {
      const newSizes = [...sizes];
      newSizes[index][key] = text;
      setSizes(newSizes);
    };

    async function handleAdditem(){
        const imageRef = await uploadImageAsync(image)
        setItemData({
            image: imageRef,
            sizes,
            brand, 
            name,
            animal,
            owner: user.id,
            category
        
        })
        if (!itemData.image) {
            Alert.alert('Erro', 'Imagem é obrigatória');
            return false;
        }
    
        if (!itemData.sizes || itemData.sizes.length === 0) {
        Alert.alert('Erro', 'Tamanhos são obrigatórios');
        return false;
        }
    
        if (!itemData.brand) {
        Alert.alert('Erro', 'Marca é obrigatória');
        return false;
        }
    
        if (!itemData.name) {
        Alert.alert('Erro', 'Nome é obrigatório');
        return false;
        }
    
        if (!itemData.animal) {
        Alert.alert('Erro', 'Animal é obrigatório');
        return false;
        }
    
        if (!itemData.owner) {
        Alert.alert('Erro', 'Proprietário é obrigatório');
        return false;
        }
    
        if (!itemData.category) {
        Alert.alert('Erro', 'Categoria é obrigatória');
        return false;
        }
        setItemId('')
        setItemId(await addDocument(itemData, 'products'))
        setItemData({})
        Alert.alert('Sucesso', 'item adicionado com sucesso');
        
        navigation.navigate('home')
    }
  
    return (
      <Wrapper>
        <Header title="Novo item" />
        <ContainerWrapper>
          <ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          >
                <Container>
                <Image source={{ uri: image }} />
                <Button title="Adicionar imagem" onPress={handleImagePicker} />
                <Input placeholder="Marca" onChangeText={(text) => setBrand(text)}/>
                <Input placeholder="Nome" onChangeText={(text) => setName(text)} />
                <Input placeholder="Categoria" onChangeText={(text) => setCategory(text)} />
                <Input placeholder="Animal" onChangeText={(text) => setAnimal(text)}/>
                <SizeText>Adicione os tamanhos</SizeText>
                {sizes.map((size, index) => (
                    <SizeContainer key={index}>
                    <Input
                        placeholder="Tamanho"
                        value={size.size}
                        onChangeText={(text) => handleSizeChange(index, 'size', text)}
                    />
                    <Input
                        placeholder="Valor"
                        keyboardType="number-pad"
                        value={size.value}
                        onChangeText={(text) => handleSizeChange(index, 'value', text)}
                    />
                    <RemoveSize onPress={() => handleRemoveSize(index)}>
                        <Minus color='red' />
                    </RemoveSize>
                    </SizeContainer>
                ))}
                <Button title="Novo tamanho" onPress={handleAddSize} />
                <Button title="Adicionar item" onPress={handleAdditem} loading={!itemId ? true : false}/>
                </Container>
            </KeyboardAvoidingView>
          </ScrollView>
        </ContainerWrapper>
      </Wrapper>
    );
  }
  
