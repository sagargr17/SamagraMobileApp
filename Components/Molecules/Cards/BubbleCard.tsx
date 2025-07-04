import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Icon, Surface, TouchableRipple} from 'react-native-paper';
import {size} from '../../../Prefrences/Prefrences';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {AppText} from '../../Elements/AppText';
// import {Icon} from '../../Elements/Icon'; // Assuming you have an Icon component

interface BubbleCardProps {
  variant: 'large' | 'small';
  title: string;
  comment?: string;
  children?: React.ReactNode;
  customStyle?: ViewStyle;
  onPress?: () => void;
  iconName?: string; // Optional prop for the icon name
  iconColor?: string;
}

const {width: screenWidth} = Dimensions.get('window');

export const BubbleCard: React.FC<BubbleCardProps> = ({
  variant = 'large',
  title,
  comment,
  children,
  customStyle,
  onPress,
  iconName,
  iconColor = 'black',
}) => {
  const {colors} = useTheme();

  const cardWidth =
    variant === 'large' ? '92%' : AreaMapper({value: 150, scaleBy: 'average'}); // Example small width

  return (
    <TouchableOpacity
      style={[
        styles.viewContainer,
        customStyle,
        {
          // paddingVertical:
          //   variant === 'large' ? size.spacing.m : size.spacing.m,
        },
      ]}
      onPress={onPress}>
      <Surface
        elevation={1}
        style={[
          styles.contentContainer,
          {
            backgroundColor: colors.card,
            padding: variant === 'large' ? size.spacing.s : size.spacing.xs,
          },
        ]}>
        {iconName && (
          <View style={styles.iconContainer}>
            <Icon
              source={iconName}
              size={size.iconSize.small}
              color={iconColor ? iconColor : colors.text}
            />
          </View>
        )}
        <View style={[styles.textContainer]}>
          <AppText
            fontVariant="medium"
            fontSizeVariant={'regular'}
            title={title} // Title using the title prop
          />
          {comment && (
            <AppText
              fontVariant="regular"
              fontSizeVariant={'caption'}
              title={comment} // Comment using the title prop
              customStyle={styles.comment}
            />
          )}
        </View>
        {children && <View style={styles.childrenContainer}>{children}</View>}
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    marginBottom: size.spacing.m - 2,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: AreaMapper({value: 12, scaleBy: 'average'}),
    borderRadius: size.borderRadius.s - 3,
    paddingTop: size.spacing.m + 2,
    paddingBottom: size.spacing.m + 2,
  },
  iconContainer: {
    marginRight: size.spacing.xxs,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: AreaMapper({value: 16, scaleBy: 'average'}),
    fontWeight: 'bold',
  },
  comment: {
    // color: 'gray',
    opacity: 0.35,
  },
  childrenContainer: {
    marginTop: AreaMapper({value: 12, scaleBy: 'average'}),
  },
});
