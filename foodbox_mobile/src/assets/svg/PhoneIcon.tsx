import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { View } from 'react-native';
import { COLORS } from '../../theme/theme';
import { IconProps } from './interface';

const PhoneIcon = (props: IconProps) => {
  return (
    <View>
      <Svg
        width={props.width || '15'}
        height={props.height || '18'}
        viewBox="0 0 11 18"
        fill="none"
      >
        <Path
          d="M5.19444 14.0833H6.97222M3.59444 16.75H8.57222C9.56787 16.75 10.0657 16.75 10.446 16.5562C10.7805 16.3858 11.0525 16.1138 11.2229 15.7793C11.4167 15.3991 11.4167 14.9012 11.4167 13.9056V3.59444C11.4167 2.5988 11.4167 2.10097 11.2229 1.72068C11.0525 1.38617 10.7805 1.1142 10.446 0.943769C10.0657 0.75 9.56787 0.75 8.57222 0.75H3.59444C2.5988 0.75 2.10097 0.75 1.72068 0.943769C1.38617 1.1142 1.1142 1.38617 0.943769 1.72068C0.75 2.10097 0.75 2.59879 0.75 3.59444V13.9056C0.75 14.9012 0.75 15.3991 0.943769 15.7793C1.1142 16.1138 1.38617 16.3858 1.72068 16.5562C2.10097 16.75 2.59879 16.75 3.59444 16.75Z"
          stroke={props.stroke || COLORS.icon}
          strokeWidth={props.strokeWidth || '1.5'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default PhoneIcon;
