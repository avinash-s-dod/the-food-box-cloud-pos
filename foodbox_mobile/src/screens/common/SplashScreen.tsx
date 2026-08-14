import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {IMAGES} from '../../assets/images';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={IMAGES.splash} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default SplashScreen;