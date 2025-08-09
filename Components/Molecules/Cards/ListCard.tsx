import FastImage from '@d11/react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import {View} from 'moti';
import React, {useState} from 'react';
import {
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Surface} from 'react-native-paper';
import {size} from '../../../Prefrences/Prefrences';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {AppText} from '../../Elements/AppText';

interface ListCardProps {
  list: Array<{
    value: string;
    type: 'regular' | 'title' | 'caption' | 'display';
    fontVariant?: 'regular' | 'medium' | 'bold' | 'heavy';
    style?: TextStyle;
  }>;
  imageUrl?: string;
  buttonDetails?: {
    title: string;
  };
  surfaceLevel?: 0 | 1 | 2 | 3 | 4 | 5 | any;
  customStyle?: ViewStyle;
  onImagePress?: () => void;
  isContainerPressed?: boolean;
  containerPressedHandle?: (id: string) => void;
  customImageStyle?: ImageStyle;
  id: string;
  child?: React.ReactNode;
}
// <-- Crucial: Set this to the actual card background color (white in your case)
export const ListCard: React.FC<ListCardProps> = ({
  list,
  surfaceLevel = 0,
  customStyle,
  onImagePress,
  isContainerPressed: isContainerPressedEnable,
  containerPressedHandle,
  customImageStyle,
  imageUrl,
  id,
  child,
}) => {
  const {colors} = useTheme();
  const [isItemSelected, setItemSelected] = useState<boolean>(false);

  // Handle
  const handleSelectedId = (id: string) => {
    console.log('Working');

    setItemSelected(!isItemSelected);
    containerPressedHandle ? containerPressedHandle(id) : null;
  };

  return (
    <Surface
      elevation={surfaceLevel ? surfaceLevel : 0}
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
        },
        customStyle,
      ]}>
      <View style={styles.detailsContainer}>
        <View>
          <View
            onTouchEnd={() =>
              isContainerPressedEnable ? handleSelectedId(id) : null
            }
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
            {imageUrl ? (
              <TouchableOpacity
                onPress={onImagePress}
                style={[styles.imageContainer]}>
                <FastImage
                  style={[
                    styles.image,
                    {
                      height: customImageStyle
                        ? customImageStyle.height
                        : styles.image.height,
                      width: customImageStyle
                        ? customImageStyle.width
                        : styles.image.width,
                    },
                  ]}
                  source={{
                    uri: imageUrl ?? imageUrl,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={onImagePress}
              style={styles.pricingContainer}>
              {list.map((item, index) => (
                <AppText
                  customStyle={item.style}
                  key={index}
                  title={item.value}
                  fontSizeVariant={item.type}
                  fontVariant={
                    item.fontVariant ? item.fontVariant : 'regular'
                  }></AppText>
              ))}
              {child ? child : null}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: size.spacing.xs,
    overflow: 'hidden',
  },
  imageContainer: {
    width: AreaMapper({value: 110, scaleBy: 'width'}),
    height: AreaMapper({value: 100, scaleBy: 'height'}),
    marginRight: AreaMapper({value: 5, scaleBy: 'height'}),
  },
  image: {
    width: '90%',
    height: '100%',
    borderRadius: size.borderRadius.m,
  },
  detailsContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pricingContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: size.spacing.xxs,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: AreaMapper({
      value: 16,
      scaleBy: 'average',
    }),
  },
});
