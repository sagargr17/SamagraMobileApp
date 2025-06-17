import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Icon, TouchableRipple} from 'react-native-paper';
import {size} from '../../../Prefrences/Prefrences';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {TextComponet} from '../../Elements/TextComponet';
// import {Icon} from '../../Elements/Icon'; // Assuming you have an Icon component

interface BubbleCardProps {
  variant: 'large' | 'small';
  title: string;
  comment?: string;
  children?: React.ReactNode;
  customStyle?: ViewStyle;
  onPress?: () => void;
  iconName?: string; // Optional prop for the icon name
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
}) => {
  const {colors} = useTheme();

  const cardWidth =
    variant === 'large' ? '92%' : AreaMapper({value: 150, scaleBy: 'average'}); // Example small width

  return (
    <TouchableOpacity
      style={[
        styles.viewContainer,
        {
          backgroundColor: colors.card,
          shadowColor: colors.card,
          padding: variant === 'large' ? size.spacing.s : size.spacing.xs,
          borderRadius: size.borderRadius.m,
        },
        customStyle,
        size.elevation.m,
      ]}
      onPress={onPress}>
      <View style={[styles.contentContainer]}>
        {iconName && (
          <View style={styles.iconContainer}>
            <Icon
              source={iconName}
              size={size.iconSize.medium}
              color={colors.text}
            />
          </View>
        )}
        <View style={[styles.textContainer]}>
          <TextComponet
            fontVariant="medium"
            fontSizeVariant={'regular'}
            title={title} // Title using the title prop
          />
          {comment && (
            <TextComponet
              fontVariant="regular"
              fontSizeVariant={'caption'}
              title={comment} // Comment using the title prop
              customStyle={styles.comment}
            />
          )}
        </View>
        {children && <View style={styles.childrenContainer}>{children}</View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    // borderRadius: AreaMapper({value: 8, scaleBy: 'average'}),
    // shadowOffset: {width: 0, height: 10},
    // shadowOpacity: 1,
    // shadowRadius: 10,
    backgroundColor: 'green',
    marginBottom: size.spacing.s,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: AreaMapper({value: 12, scaleBy: 'average'}),
    borderRadius: size.borderRadius.s,
    paddingTop: size.spacing.s,
    paddingBottom: size.spacing.s,
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
