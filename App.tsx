import React, { useState } from 'react';
import { StatusBar } from "react-native";
import Theme from './src/theme';
import { ThemeProvider } from "styled-components/native"
import { AuthRoutes } from './src/routes/auth.routes';
import { useFonts,  Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';
import  ContextProvider from './src/contexts/Context';

export default function App(){
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold })

  return (
    <ContextProvider>
        <ThemeProvider theme={Theme}>
          <StatusBar
            barStyle='dark-content'
            backgroundColor='transparent'
            translucent
            />
          { fontsLoaded ? <Routes/> : <Loading type='PRIMARY'/>}
        </ThemeProvider>
    </ContextProvider>
  );
}

