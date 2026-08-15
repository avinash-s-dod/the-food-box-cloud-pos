import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { View } from 'react-native';
import { COLORS } from '../../theme/theme';
import { IconProps } from './interface';

const ProfileIcon = (props: IconProps) => {
  return (
    <View>
      <Svg
        width={props.width || '18'}
        height={props.height || '18'}
        viewBox="0 0 18 18"
        fill="none"
      >
        <Path
          d="M0.75 16.75C0.75 13.3136 3.66015 10.5278 7.25 10.5278C10.8399 10.5278 13.75 13.3136 13.75 16.75M10.9643 4.30556C10.9643 6.26924 9.30131 7.86111 7.25 7.86111C5.19866 7.86111 3.53571 6.26924 3.53571 4.30556C3.53571 2.34188 5.19866 0.75 7.25 0.75C9.30131 0.75 10.9643 2.34188 10.9643 4.30556Z"
          stroke={props.stroke || COLORS.icon}
          strokeWidth={props.strokeWidth || '1.5'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default ProfileIcon;
