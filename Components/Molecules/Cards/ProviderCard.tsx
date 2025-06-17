import FastImage from '@d11/react-native-fast-image';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {useTheme} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {AppText} from '../../Elements/AppText';
import {ProviderCardSkeleton} from '../../Skeletons/ProviderCardSkeleton';
import {PairButtons} from '../Global/PairButtons';
import AppButton from '../../Elements/Button';
import {RowFlexLayout} from '../../../Layout/PartationLayout/RowFlexLayout';

interface ProviderCardProps {
  titleName: string;
  image: string;
  distance: number;
  rating: number;
  priceperhour: number;
  setPersonalDetaile: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setIsProfileTapped: any;
  onAcceptButtonPress: () => void;
  isProgressBarEnable: boolean;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  titleName,
  image,
  distance,
  rating,
  priceperhour,
  setIsProfileTapped,
  setPersonalDetaile,
  isProgressBarEnable = true,
  onAcceptButtonPress,
}) => {
  const {colors} = useTheme();
  const {Star} = Logos;
  const [progressBarData, setProgressBarData] = useState(0.1);
  const [isDeclined, setISdeclined] = useState<boolean>(false);

  useMemo(() => {
    if (isProgressBarEnable === true)
      setTimeout(() => {
        setProgressBarData(progressBarData + 0.4);
      }, 2000);
  }, [progressBarData]);

  type providerPrimarycontain = () => React.ReactNode;
  const providerPrimarycontain = (allDetailDisplay: boolean = true) => (
    <View style={ProviderCardStyle.dataContainer}>
      <TouchableOpacity
        style={{
          backgroundColor: colors.card,
        }}
        onPress={() => {
          setIsProfileTapped(true);
          setPersonalDetaile(providerPrimarycontain(false));
        }}>
        <FastImage
          style={[
            ProviderCardStyle.image,
            {
              borderColor: colors.border,
            },
          ]}
          source={{
            uri: image,
          }}></FastImage>
      </TouchableOpacity>

      <View style={ProviderCardStyle.textContainer}>
        <AppText
          title={titleName}
          fontVariant="medium"
          fontSizeVariant={'regular'}
          customStyle={{
            width: 260,
          }}></AppText>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: AreaMapper({
              value: 6,
              scaleBy: 'average',
            }),
          }}>
          <AppText
            title={'Rs.' + priceperhour + ' per hour'}
            fontVariant="regular"
            fontSizeVariant={'regular'}></AppText>
        </View>
        <View
          style={{
            marginTop: AreaMapper({
              value: 6,
              scaleBy: 'average',
            }),
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            {Array.from({length: rating}).map((_, index) => (
              <Star key={index} />
            ))}
            <AppText
              customStyle={{
                marginLeft: 5,
              }}
              title={distance + ' km away'}
              fontVariant="regular"
              fontSizeVariant={'regular'}></AppText>
          </View>
          {allDetailDisplay ? (
            <AppText
              title={`Total: Rs.${priceperhour * 50}`}
              fontVariant="bold"
              fontSizeVariant={'regular'}
              customStyle={{
                color: colors.primary,
              }}></AppText>
          ) : null}
        </View>
      </View>
    </View>
  );

  const Cardcontent = () => {
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

                {providerPrimarycontain()}

                <RowFlexLayout>
                  <AppButton
                    style={{
                      flex: 0.4,
                    }}
                    onPress={onAcceptButtonPress}>
                    Accept
                  </AppButton>
                  <AppButton
                    buttonColor={colors.notification}
                    style={{
                      flex: 0.4,
                    }}
                    onPress={() => setISdeclined(!isDeclined)}>
                    Decline
                  </AppButton>
                </RowFlexLayout>
              </View>
            )}
          </>
        ) : null}
      </>
    );
  };

  return <>{Cardcontent()}</>;
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
    borderWidth: AreaMapper({
      value: 2,
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
    flex: 0.4,
  },
});
