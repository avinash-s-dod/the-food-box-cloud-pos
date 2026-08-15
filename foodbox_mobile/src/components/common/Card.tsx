import React, { ReactNode } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, Image } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../../theme/theme';
import { IMAGES } from '../../assets/images';

interface CardProps {
  children: ReactNode;
  logo?: boolean;
  customStyles?: StyleProp<ViewStyle>;
}

const Card = ({ children, customStyles, logo }: CardProps) => {
  return (
    <View
      style={[styles.container, logo && styles.containerWithLogo, customStyles]}
    >
      {logo && (
        <View style={styles.logoContainer}>
          <Image source={IMAGES.foodboxLogo} style={styles.logoImage} />
        </View>
      )}
    
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingHorizontal: SPACING.SPACE_20,
    paddingTop: SPACING.SPACE_32 - 2,
    paddingBottom: SPACING.SPACE_32 - 2,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.RADIUS_20,
    gap: SPACING.SPACE_20,
  },
  containerWithLogo: {
    paddingTop: 65,
  },
  logoContainer: {
    position: 'absolute',
    top: -55,
    alignSelf: 'center',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  
});

export default Card;
