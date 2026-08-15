import React, { ReactNode } from 'react';
import {
  Image,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IMAGES } from '../../assets/images';

interface AuthLayoutProps {
  children: ReactNode;
  scrollEnabled?: boolean;
}

const AuthLayout = ({ children, scrollEnabled = false }: AuthLayoutProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={IMAGES.authBackground}
        style={styles.background}
        resizeMode="cover"
      />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={'height'}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            scrollEnabled={scrollEnabled}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.innerContainer}>{children}</View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default AuthLayout;
