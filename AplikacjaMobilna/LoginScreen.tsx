import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './App';

type NewScreenRouteProp = RouteProp<RootStackParamList, 'LoginScreen'>;

const LoginScreen = () => {
  const { params } = useRoute<NewScreenRouteProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{params.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default LoginScreen;