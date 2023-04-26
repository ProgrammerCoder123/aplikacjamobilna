import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import LoginScreen from './LoginScreen';



export type RootStackParamList = {
  Main: undefined;
  LoginScreen: { message: string };
};

const Stack = createStackNavigator<RootStackParamList>();



const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  
};

const MainScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [message, setMessage] = useState('');

  const handleButtonPress = () => {
    navigation.navigate('LoginScreen', { message: 'Hello, world!' });
  };


  const handleLoginPress = () => {
    navigation.navigate('LoginScreen', { message: 'Hello, world!' });
    console.log('Zaloguj');
  };

  const handleRegisterPress = () => {
    console.log('Zarejestruj');
  };

  const handleExitPress = () => {
    console.log('Zamknij aplikację');
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'blue' }]}
        onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Zaloguj</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'green' }]}
        onPress={handleRegisterPress}>
        <Text style={styles.buttonText}>Zarejestruj</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'red' }]}
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
    marginBottom: 10,
    
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
  },
});

export default App;