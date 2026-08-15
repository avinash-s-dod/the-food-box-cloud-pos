/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import AppNavigator from './src/navigator/AppNavigator';
import { StatusBar } from 'react-native';

const App = () => {
  useEffect(() => {
    const hideBootSplash = async () => {
      await BootSplash.hide({ fade: true },);
    };

    hideBootSplash();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </>
  );
};

export default App;
