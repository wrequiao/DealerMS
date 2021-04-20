import React from 'react';
import {View, Pressable} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import {wp, hp} from '~/core/utils';

export default (TouchClick = props => {
  const {children, MarginVertical} = props;
  return (
    <Touchable
      hitSlop={{
        top: wp(1),
        right: wp(1),
        bottom: wp(1),
        left: wp(1),
      }}
      {...props}>
      <>{children}</>
    </Touchable>
  );
});

/*

	<Pressable hitSlop={wp(0.5)} {...props}>
				<>{children}</>
			</Pressable>
*/
