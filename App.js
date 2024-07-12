import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import QuizMain from './src/screens/QuizMain'
import Home from './src/screens/MainItems/Home'
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  useEffect(() => {
    setTimeout(()=>{
    SplashScreen.hide();
    },1000)
  }, []);
  
  return (
   <Home/>
  )
}

export default App

const styles = StyleSheet.create({})