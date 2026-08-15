import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {IMAGES} from '../../assets/images';
import {RootStackParamList} from '../../navigator/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({navigation}: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

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