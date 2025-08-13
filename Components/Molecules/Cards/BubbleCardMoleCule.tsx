import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Icon} from 'react-native-paper';
import {size} from '../../../Prefrences/Prefrences';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {AppTextElement} from '../../Elements/AppTextElement';
// import {Icon} from '../../Elements/Icon'; // Assuming you have an Icon component

interface BubbleCardMoleculeProps {
  variant: 'large' | 'small';
  title: string;
  comment?: string;
  children?: React.ReactNode;
  customStyle?: ViewStyle;
  onPress?: () => void;
  iconName?: string | any; // Optional prop for the icon name
  iconColor?: string;
}

export const BubbleCardMolecule: React.FC<BubbleCardMoleculeProps> = ({
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
    variant === 'large' ? '100%' : AreaMapper({value: 188, scaleBy: 'average'}); // Example small width

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[
          {
            // paddingVertical: size.spacing.xs,
            width: cardWidth,
            backgroundColor: colors.background, // <-- Crucial: Set this to the actual card background color (white in your case)
            borderRadius: size.borderRadius.m,
            borderWidth: 1,
            borderColor: colors.card,
            padding: 0,
          },
          size.elevation.xs,
          customStyle,
        ]}>
        <View
          style={[
            styles.contentContainer,
            {
              paddingHorizontal:
                variant === 'large' ? size.spacing.s : size.spacing.xs,
              paddingVertical:
                variant === 'large' ? size.spacing.m : size.spacing.s,
              // No need for borderColor here either
              borderRadius: size.borderRadius.m, // Keep this for inner content rounding
              backgroundColor: colors.background,
            },
          ]}>
          {iconName && typeof iconName === 'string' ? (
            <View
              style={[
                styles.iconContainer,
                {
                  // backgroundColor: 'pink',
                },
              ]}>
              <Icon
                source={iconName}
                size={size.iconSize.medium}
                color={iconColor ? iconColor : colors.text}
              />
            </View>
          ) : (
            iconName
          )}

          <View style={[styles.textContainer]}>
            <AppTextElement
              fontVariant="medium"
              fontSizeVariant={'title'}
              title={title} // Title using the title prop
            />
            {comment && (
              <AppTextElement
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
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    marginBottom: size.spacing.m,
    borderWidth: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: size.borderRadius.m,
    paddingVertical: size.spacing.m,
  },
  iconContainer: {
    marginRight: size.spacing.xxs,
  },
  textContainer: {
    flex: 1,
    marginLeft: size.spacing.xs,
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
