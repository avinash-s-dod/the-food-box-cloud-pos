/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

import SplashScreen from './src/screens/common/SplashScreen';

const App = () => {

   useEffect(() => {
    const hideBootSplash = async () => {
      await BootSplash.hide({fade: true});
    };

    hideBootSplash();
  }, []);

  return <SplashScreen />;
};

export default App;