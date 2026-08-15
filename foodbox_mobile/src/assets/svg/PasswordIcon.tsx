import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { View } from 'react-native';
import { COLORS } from '../../theme/theme';
import { IconProps } from './interface';

const PasswordIcon = (props: IconProps) => {
  return (
    <View>
      <Svg
        width={props.width || '18'}
        height={props.height || '18'}
        viewBox="0 0 18 18"
        fill="none"
      >
        <Path
          d="M11.5322 5.37548L14.3418 2.43199L15.9473 0.75M14.3418 2.43199L16.75 4.95498L13.9404 7.89847L11.5322 5.37548M8.23301 8.83197C8.64749 9.26043 8.97698 9.77056 9.20251 10.333C9.42804 10.8954 9.54515 11.499 9.5471 12.109C9.54905 12.7191 9.4358 13.3235 9.21388 13.8875C8.99195 14.4514 8.66573 14.9639 8.25399 15.3952C7.84226 15.8266 7.35315 16.1684 6.81482 16.4009C6.27649 16.6334 5.69958 16.752 5.11731 16.75C4.53503 16.7479 3.95889 16.6252 3.42206 16.389C2.88523 16.1527 2.39832 15.8075 1.98935 15.3732C1.18512 14.5009 0.740108 13.3325 0.750167 12.1197C0.760226 10.9069 1.22455 9.74676 2.04313 8.88916C2.86171 8.03156 3.96906 7.5451 5.12667 7.53456C6.28427 7.52402 7.39952 7.99025 8.2322 8.83281L8.23301 8.83197ZM8.23301 8.83197L11.5322 5.37548"
          stroke={props.stroke || COLORS.icon}
          strokeWidth={props.strokeWidth || '1.5'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default PasswordIcon;
