import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';



export type RootStackParamList = {
  Main: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();



const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{headerTitle: '', headerStyle: {
      backgroundColor: '#42A5F5',
    }}}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  
};

const MainScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [message, setMessage] = useState('');

  const handleLoginPress = () => {
    navigation.navigate('LoginScreen');
  };

  const handleRegisterPress = () => {
    navigation.navigate('SignUpScreen');
  };

  const handleExitPress = () => {
    console.log('Zamknij aplikację');
  };


  return (
    
    <View style={styles.container}>

      <Text style={{fontSize: 40, marginBottom: 50,}}>Aplikacja notatnikowa</Text>
     
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#0277BD' }]}
        onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Zaloguj</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#0277BD' }]}
        onPress={handleRegisterPress}>
        <Text style={styles.buttonText}>Zarejestruj</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#D32F2F' }]}
        onPress={handleExitPress}>
        <Text style={styles.buttonText}>Zamknij aplikację</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    elevation: 4,    
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    fontSize: 20,
   
  },
});

export default App;