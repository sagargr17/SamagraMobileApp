import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Icon} from 'react-native-paper';
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
    variant === 'large' ? '92%' : AreaMapper({value: 180, scaleBy: 'average'}); // Example small width

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[
          {
            paddingVertical: size.spacing.xxs + 1,
            marginBottom: size.spacing.s,
            width: cardWidth,
            backgroundColor: 'white', // <-- Crucial: Set this to the actual card background color (white in your case)
            borderRadius: size.borderRadius.m,
            ...Platform.select({
              ios: {
                shadowColor: '#000', // Typically black for shadows, you can adjust opacity
                shadowOffset: {width: 0, height: 4}, // Consistent shadow direction
                shadowOpacity: 0.1, // Adjust this for a softer or harder shadow (0 to 1)
                shadowRadius: 6, // Adjust this for blurriness of the shadow
              },
              android: {
                elevation: 9, // A good starting point for elevation on Android
                shadowColor: 'rgb(156, 156, 156)',
                shadowOffset: {width: 0, height: 5}, // Consistent shadow direction

                // No need for borderWidth/borderColor on Android either if you want no visible border
              },
            }),
          },
        ]}>
        <View
          style={[
            styles.contentContainer,
            {
              padding: variant === 'large' ? size.spacing.s : size.spacing.xs,
              // No need for borderColor here either
              borderRadius: size.borderRadius.m, // Keep this for inner content rounding
            },
          ]}>
          {iconName && (
            <View
              style={[
                styles.iconContainer,
                {
                  // backgroundColor: 'pink',
                },
              ]}>
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
