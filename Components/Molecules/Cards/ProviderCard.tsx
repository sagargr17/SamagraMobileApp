import FastImage from '@d11/react-native-fast-image';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {useTheme} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {StyleSheet, TextStyle, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {RowFlexLayout} from '../../../Layout/PartationLayout/RowFlexLayout';
import {size} from '../../../Prefrences/Prefrences';
import {AreaMapper, titleRange} from '../../../Utilities/CustomMethods';
import {AppText} from '../../Elements/AppText';
import AppButton from '../../Elements/Button';
import {AppBottomSheet} from '../Global/AppBottomSheet';

interface ProviderCardProps {
  list: Array<{
    value: string;
    type: 'regular' | 'title' | 'caption' | 'display';
    style?: TextStyle;
    fontVariant?: 'regular' | 'medium' | 'bold' | 'heavy';
  }>;
  imageUrl: string;
  setProfileTapped?: () => void;
  onAcceptButtonPress: () => void;
  isProgressBarEnable: boolean;
  isButtonVisible?: boolean;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  imageUrl,
  list,
  isProgressBarEnable = true,
  onAcceptButtonPress,
  setProfileTapped,
  isButtonVisible = true,
}) => {
  const {colors} = useTheme();
  const [progressBarData, setProgressBarData] = useState(0.1);
  const [isDeclined, setISdeclined] = useState<boolean>(false);

  // ProgressBar Loading
  useMemo(() => {
    if (isProgressBarEnable === true)
      setTimeout(() => {
        setProgressBarData(progressBarData + 0.4);
      }, 2000);
    return () => clearTimeout(0);
  }, [progressBarData]);

  type CardHeader = React.ReactNode;
  const CardHeader = (
    <View style={ProviderCardStyle.dataContainer}>
      <TouchableOpacity
        style={{
          backgroundColor: colors.card,
        }}
        onPress={() => {
          setProfileTapped ? setProfileTapped() : null;
        }}>
        <FastImage
          style={[
            ProviderCardStyle.image,
            {
              borderColor: colors.border,
            },
          ]}
          source={{
            uri: imageUrl,
          }}
          resizeMode="cover"></FastImage>
      </TouchableOpacity>

      <View
        style={ProviderCardStyle.textContainer}
        onTouchEnd={() => {
          setProfileTapped ? setProfileTapped() : null;
        }}>
        {list.map((item, index) => (
          <AppText
            customStyle={item.style}
            key={index}
            title={item.value}
            fontVariant={item.fontVariant}
            fontSizeVariant={item.type}></AppText>
        ))}
      </View>
    </View>
  );

  const CardBody = () => {
    return (
      <>
        {!isDeclined ? (
          <>
            {isProgressBarEnable ? (
              0
            ) : progressBarData > 1 ? null : (
              <View
                style={[
                  ProviderCardStyle.cardContainer,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.card,
                  },
                ]}>
                {isProgressBarEnable ?? (
                  <ProgressBar
                    progress={progressBarData}
                    color={colors.primary}
                  />
                )}
                {CardHeader}
                {isButtonVisible ? (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <AppButton
                      textColor={colors.text}
                      buttonColor={'#DCDCDC'}
                      style={{
                        borderRadius: size.borderRadius.s,
                        marginHorizontal: size.spacing.xxs,
                      }}
                      onPress={() => setISdeclined(!isDeclined)}>
                      Decline ✗
                    </AppButton>
                    <AppButton
                      style={{
                        borderRadius: size.borderRadius.s,
                        marginHorizontal: size.spacing.xxs,
                      }}
                      onPress={onAcceptButtonPress}>
                      Procced ✓
                    </AppButton>
                  </View>
                ) : null}
              </View>
            )}
          </>
        ) : null}
      </>
    );
  };

  return <>{CardBody()}</>;
};

const ProviderCardStyle = StyleSheet.create({
  cardContainer: {
    borderWidth: AreaMapper({
      value: 0.4,
      scaleBy: 'average',
    }),
    margin: AreaMapper({
      value: 8,
      scaleBy: 'average',
    }),
    borderRadius: AreaMapper({
      value: 8,
      scaleBy: 'average',
    }),
    elevation: 1,
    shadowOffset: {
      height: 5,
      width: 0.1,
    },
    padding: AreaMapper({
      value: 10,
      scaleBy: 'average',
    }),
  },

  dataContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: AreaMapper({
      value: 16,
      scaleBy: 'average',
    }),
    marginVertical: AreaMapper({
      value: 16,
      scaleBy: 'average',
    }),
    paddingHorizontal: AreaMapper({
      value: 16,
      scaleBy: 'average',
    }),
  },
  textContainer: {
    marginHorizontal: AreaMapper({
      value: 16,
      scaleBy: 'average',
    }),
    lineHeight: AreaMapper({
      value: 22,
      scaleBy: 'average',
    }),
  },
  image: {
    height: AreaMapper({
      value: 50,
      scaleBy: 'average',
    }),
    width: AreaMapper({
      value: 50,
      scaleBy: 'average',
    }),
    borderRadius: AreaMapper({
      value: 80,
      scaleBy: 'average',
    }),
  },

  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: AreaMapper({
      value: 8,
      scaleBy: 'average',
    }),
  },

  action: {
    borderRadius: 2,
    paddingVertical: 2,
    marginTop: 15,
  },
});
