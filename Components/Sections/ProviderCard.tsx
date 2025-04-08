import React, {useEffect, useMemo, useState} from 'react';
import {
  Button,
  Card,
  Icon,
  PaperProvider,
  ProgressBar,
} from 'react-native-paper';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {TextComponet} from '../Elements/TextComponet';
import {ProviderCardSkeleton} from '../Skeletons/ProviderCardSkeleton';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import AppButton from '../Elements/Button';
import {useTheme} from '@react-navigation/native';
import {Logos} from '../../Assets/SVG/Exports/Exports';

interface ProviderCardProps {
  titleName: string;
  image: string;
  distance: number;
  rating: number;
  priceperhour: number;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  titleName,
  image,
  distance,
  rating,
  priceperhour,
}) => {
  const {colors} = useTheme();
  const {Star} = Logos;
  const [progressBarData, setProgressBarData] = useState(0.1);

  useMemo(() => {
    setTimeout(() => {
      setProgressBarData(progressBarData + 0.25);
    }, 1000);
  }, [progressBarData]);

  const content = () => {
    return (
      <View
        style={[
          ProviderCardStyle.cardContainer,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
          },
        ]}>
        <ProgressBar progress={progressBarData} color={colors.primary} />
        <View style={ProviderCardStyle.dataContainer}>
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

          <View style={ProviderCardStyle.textContainer}>
            <TextComponet
              title={titleName}
              fontVariant="medium"
              fontSize={17}
              lineHeight={22}></TextComponet>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: SamagraScaller({
                  value: 6,
                  scaleBy: 'average',
                }),
              }}>
              {Array.from({length: rating}).map((_, index) => (
                <Star key={index} />
              ))}
            </View>
            <View
              style={{
                marginTop: SamagraScaller({
                  value: 6,
                  scaleBy: 'average',
                }),
              }}>
              <TextComponet
                title={'Rs.' + priceperhour + ' per hour'}
                fontVariant="regular"
                fontSize={16}
                lineHeight={22}></TextComponet>

              <TextComponet
                title={distance + ' km away'}
                fontVariant="regular"
                fontSize={16}
                lineHeight={22}></TextComponet>
            </View>
          </View>
        </View>
        <View style={[ProviderCardStyle.actionContainer]}>
          <AppButton
            customStyle={{
              paddingVerticle: SamagraScaller({
                value: 1,
                scaleBy: 'average',
              }),
            }}
            color="light"
            onPress={() => {
              console.log('Delete');
            }}
            mode="outlined"
            style={[ProviderCardStyle.action]}>
            Decline
          </AppButton>
          <AppButton
            customStyle={{
              paddingVerticle: SamagraScaller({
                value: 0.2,
                scaleBy: 'average',
              }),
            }}
            onPress={() => {
              console.log('Accept');
            }}
            style={[ProviderCardStyle.action]}>
            Accept
          </AppButton>
        </View>
      </View>
    );
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <ProviderCardSkeleton></ProviderCardSkeleton>
      ) : (
        // ) : progressBarData > 1 ? null : (
        content()
      )}
    </>
  );
};

const ProviderCardStyle = StyleSheet.create({
  cardContainer: {
    borderWidth: SamagraScaller({
      value: 0.4,
      scaleBy: 'average',
    }),
    margin: SamagraScaller({
      value: 8,
      scaleBy: 'average',
    }),
    borderRadius: SamagraScaller({
      value: 8,
      scaleBy: 'average',
    }),
    elevation: 1,
    shadowOffset: {
      height: 5,
      width: 0.1,
    },
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: SamagraScaller({
      value: 16,
      scaleBy: 'average',
    }),
    marginVertical: SamagraScaller({
      value: 16,
      scaleBy: 'average',
    }),
    paddingHorizontal: SamagraScaller({
      value: 16,
      scaleBy: 'average',
    }),
  },
  textContainer: {
    marginHorizontal: SamagraScaller({
      value: 16,
      scaleBy: 'average',
    }),
    lineHeight: SamagraScaller({
      value: 22,
      scaleBy: 'average',
    }),
  },
  image: {
    height: SamagraScaller({
      value: 65,
      scaleBy: 'average',
    }),
    width: SamagraScaller({
      value: 65,
      scaleBy: 'average',
    }),
    borderRadius: SamagraScaller({
      value: 80,
      scaleBy: 'average',
    }),
    borderWidth: SamagraScaller({
      value: 2,
      scaleBy: 'average',
    }),
  },

  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: SamagraScaller({
      value: 8,
      scaleBy: 'average',
    }),
  },

  action: {
    flex: 0.4,
  },
});
