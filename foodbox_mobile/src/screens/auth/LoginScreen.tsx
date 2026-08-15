import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  AuthLayout,
  Card,
  CustomButton,
  CustomInput,
  CustomText,
  AuthFooterLink,
} from '../../components';
import { SVG } from '../../assets/svg';
import { SPACING } from '../../theme/theme';
import { RootStackParamList } from '../../navigator/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const LoginScreen: React.FC<Props> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <AuthLayout>
      <View style={styles.container}>
        <Card logo>
          <View style={{ gap: 5 }}>
            <CustomText variant="title">Login Account</CustomText>
            <CustomText variant="subtitle">
              Please enter your details to login
            </CustomText>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
          >
            <CustomInput
              label={'Email or Phone Number'}
              leftIcon={<SVG.Profile />}
            />
            <CustomInput
              label={'Password'}
              leftIcon={<SVG.Password />}
              secureTextEntry
            />

            <CustomButton title="Login" />
          </KeyboardAvoidingView>
        </Card>
        <AuthFooterLink
          text="Didn't have an account ?"
          linkText="Sign Up"
          onLinkPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: SPACING.SPACE_20,
    paddingVertical: SPACING.SPACE_30,
    gap: SPACING.SPACE_14,
  },
  keyboardAvoidingView: {
    flex: 1,
    gap: 20,
  },
});

export default LoginScreen;
