import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { View } from 'react-native';
import { COLORS } from '../../theme/theme';
import { IconProps } from './interface';

const PlusIcon = (props: IconProps) => {
  return (
    <View>
      <Svg
        width={props.width || '25'}
        height={props.height || '25'}
        viewBox="0 0 25 25"
        fill="none"
      >
        <Path
          d="M1.5 12.5H23.5M12.5 1.5V23.5"
          stroke={props.stroke || COLORS.icon}
          strokeWidth={props.strokeWidth || '3'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default PlusIcon;
