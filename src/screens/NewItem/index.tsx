import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Header } from '../../components/Header';
import { Container, Wrapper, ContainerWrapper, SizeText, SizeContainer, RemoveSize, Image } from './styles';
import { Minus } from 'phosphor-react-native';

export function NewItem() {
    const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/4211/4211547.png');
    const [sizes, setSizes] = useState([{ size: '', value: '' }]);
  
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

    function handleAdditem(){
        console.log('Data:', {
            image,
            sizes
        })
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
                <Input placeholder="Marca" />
                <Input placeholder="Nome" />
                <Input placeholder="Animal" />
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
                <Button title="Adicionar item" onPress={handleAdditem} />
                </Container>
            </KeyboardAvoidingView>
          </ScrollView>
        </ContainerWrapper>
      </Wrapper>
    );
  }
  
