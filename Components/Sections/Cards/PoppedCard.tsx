import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Dimensions,
} from 'react-native';
import {SamagraScaller} from '../../../Utilities/CustomMethods';
import {TextComponet} from '../../Elements/TextComponet';
import {Icon} from 'react-native-paper';
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
      : SamagraScaller({value: 150, scaleBy: 'average'}); // Example small width

  return (
    <TouchableOpacity
      style={[
        styles.viewContainer,
        {
          // width: cardWidth,
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: colors.border,
        },
        customStyle,
      ]}
      onPress={onPress}>
      <View style={styles.contentContainer}>
        {iconName && (
          <View style={styles.iconContainer}>
            <Icon
              source={iconName}
              size={SamagraScaller({value: 30, scaleBy: 'average'})}
              color={colors.primary}
            />
          </View>
        )}
        <View style={styles.textContainer}>
          <TextComponet
            fontVariant="medium"
            fontSize={18}
            title={title} // Title using the title prop
            lineHeight={20}
          />
          {comment && (
            <TextComponet
              fontVariant="regular"
              fontSize={14}
              lineHeight={20}
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
    borderWidth: SamagraScaller({
      value: 0.2,
      scaleBy: 'average',
    }),
    borderRadius: SamagraScaller({value: 8, scaleBy: 'average'}),
    elevation: 2, // For Android shadow

    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 10,
    marginVertical: SamagraScaller({value: 8, scaleBy: 'average'}),
    // marginHorizontal: SamagraScaller({value: 16, scaleBy: 'average'}),
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SamagraScaller({value: 12, scaleBy: 'average'}),
  },
  iconContainer: {
    marginRight: SamagraScaller({value: 12, scaleBy: 'average'}),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: SamagraScaller({value: 16, scaleBy: 'average'}),
    fontWeight: 'bold',
  },
  comment: {
    // color: 'gray',
    opacity: 0.35,
  },
  childrenContainer: {
    marginTop: SamagraScaller({value: 12, scaleBy: 'average'}),
  },
});
