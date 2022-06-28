import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import {styles} from './styles'

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large"  />
    </View>
  );
};

export default SplashScreen;
