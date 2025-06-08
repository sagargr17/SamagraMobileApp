import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Dimensions,
  TouchableHighlight,
  TouchableWithoutFeedbackBase,
} from 'react-native';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {TextComponet} from '../../Elements/TextComponet';
import {Icon, TouchableRipple} from 'react-native-paper';
// import {Icon} from '../../Elements/Icon'; // Assuming you have an Icon component

interface PoppedCardProps {
  variant: 'large' | 'small';
  title: string;
  comment?: string;
  children?: React.ReactNode;
  customStyle?: ViewStyle;
  onPress?: () => void;
  iconName?: string; // Optional prop for the icon name
}

const {width: screenWidth} = Dimensions.get('window');

export const PoppedCard: React.FC<PoppedCardProps> = ({
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
    variant === 'large'
      ? '92%'
      : AreaMapper({value: 150, scaleBy: 'average'}); // Example small width

  return (
    <TouchableRipple
      // underlayColor={'#e3e3e3'}
      style={[
        styles.viewContainer,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: colors.border,
          padding:
            variant === 'large'
              ? AreaMapper({value: 10, scaleBy: 'average'})
              : AreaMapper({value: 8, scaleBy: 'average'}),
        },
        customStyle,
      ]}
      onPress={onPress}>
      <View style={styles.contentContainer}>
        {iconName && (
          <View style={styles.iconContainer}>
            <Icon
              source={iconName}
              size={AreaMapper({value: 30, scaleBy: 'average'})}
              color={'gray'}
            />
          </View>
        )}
        <View style={styles.textContainer}>
          <TextComponet
            fontVariant="medium"
            fontSizeVariant={18}
            title={title} // Title using the title prop
            lineHeight={20}
          />
          {comment && (
            <TextComponet
              fontVariant="regular"
              fontSizeVariant={14}
              lineHeight={24}
              title={comment} // Comment using the title prop
              customStyle={styles.comment}
            />
          )}
        </View>
        {children && <View style={styles.childrenContainer}>{children}</View>}
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    borderRadius: AreaMapper({value: 8, scaleBy: 'average'}),
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 1,
    shadowRadius: 10,
    marginVertical: AreaMapper({value: 5, scaleBy: 'average'}),
    borderWidth: 0.1,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: AreaMapper({value: 12, scaleBy: 'average'}),
  },
  iconContainer: {
    marginRight: AreaMapper({value: 12, scaleBy: 'average'}),
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
