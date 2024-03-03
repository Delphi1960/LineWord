import {Badge} from '@rneui/themed';
import React from 'react';
import {Image, ImagePropsBase, TouchableOpacity, ViewStyle} from 'react-native';

type Props = {
  image: any;
  onPress: () => void;
  imageStyle: ImagePropsBase;
  badge?: boolean;
  badgeValue?: number;
  badgeStyle?: ViewStyle;
};

export default function ImageButton({
  image,
  onPress,
  imageStyle,
  badge,
  badgeValue,
  badgeStyle,
}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={image} style={imageStyle} resizeMode="contain" />
      {badge ? (
        <Badge status="error" value={badgeValue} containerStyle={badgeStyle} />
      ) : null}
    </TouchableOpacity>
  );
}
