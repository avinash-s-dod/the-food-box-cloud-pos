import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
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

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const SignUpScreen: React.FC<Props> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <AuthLayout scrollEnabled={false}>
      <View style={styles.container}>
        <Card logo customStyles={styles.card}>
          <View style={styles.header}>
            <CustomText variant="title">Create Account</CustomText>
            <CustomText variant="subtitle">
              Please enter your details to create account
            </CustomText>
          </View>

          <ScrollView
            style={styles.scrollFields}
            contentContainerStyle={styles.scrollFieldsContent}
            showsVerticalScrollIndicator={false}
          >
            <CustomInput label={'Name'} leftIcon={<SVG.Profile />} />
            <CustomInput label={'Email'} leftIcon={<SVG.Email />} />
            <CustomInput label={'Phone Number'} leftIcon={<SVG.Phone />} />
            <CustomInput
              label={'Password'}
              leftIcon={<SVG.Password />}
              secureTextEntry
            />
            <CustomInput
              label={'Confirm Password'}
              leftIcon={<SVG.Password />}
              secureTextEntry
            />
          </ScrollView>

          <CustomButton title="SignUp" />
        </Card>

        <AuthFooterLink
          text="Already have an account ?"
          linkText="Log In"
          onLinkPress={() => navigation.navigate('Login')}
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
    paddingVertical: SPACING.SPACE_30, // 30px top and bottom margin/padding
    gap: SPACING.SPACE_14,
  },
  card: {
    height: SCREEN_HEIGHT,
    maxHeight: SCREEN_HEIGHT - 280,
  },
  header: {
    gap: 5,
  },
  scrollFields: {
    flex: 1,
  },
  scrollFieldsContent: {
    gap: 12,
  },
});

export default SignUpScreen;
