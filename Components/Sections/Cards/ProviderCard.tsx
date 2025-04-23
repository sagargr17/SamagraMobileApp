import FastImage from '@d11/react-native-fast-image';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {useTheme} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {SamagraScaller} from '../../../Utilities/CustomMethods';
import {TextComponet} from '../../Elements/TextComponet';
import {ProviderCardSkeleton} from '../../ErrorLoadingHandling/Skeletons/ProviderCardSkeleton';
import {PairButtons} from '../PairButtons';

interface ProviderCardProps {
  titleName: string;
  image: string;
  distance: number;
  rating: number;
  priceperhour: number;
  setPersonalDetaile: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setIsProfileTapped: any;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  titleName,
  image,
  distance,
  rating,
  priceperhour,
  setIsProfileTapped,
  setPersonalDetaile,
}) => {
  const {colors} = useTheme();
  const {Star} = Logos;
  const [progressBarData, setProgressBarData] = useState(0.1);

  useMemo(() => {
    setTimeout(() => {
      setProgressBarData(progressBarData + 0.25);
    }, 1000);
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextComponet
              title={'Rs.' + priceperhour + ' per hour'}
              fontVariant="regular"
              fontSize={16}
              lineHeight={22}></TextComponet>

            <TextComponet
              customStyle={{
                marginLeft: 20,
              }}
              title={distance + ' km away'}
              fontVariant="regular"
              fontSize={16}
              lineHeight={22}></TextComponet>
          </View>
          {allDetailDisplay ? (
            <TextComponet
              title={`Total: Rs.${priceperhour * 50}`}
              fontVariant="bold"
              fontSize={20}
              lineHeight={28}
              customStyle={{
                color: colors.primary,
              }}></TextComponet>
          ) : null}
        </View>
      </View>
    </View>
  );

  const bottomShitChildren = () => {
    providerPrimarycontain(false);
  };

  const Cardcontent = () => {
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
        {providerPrimarycontain()}
        <PairButtons
          onAcceptPress={() => {
            console.log('Accept');
          }}
          onDeclinPress={() => {
            console.log('Decline');
          }}></PairButtons>
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
        Cardcontent()
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
    padding: SamagraScaller({
      value: 10,
      scaleBy: 'average',
    }),
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
      value: 50,
      scaleBy: 'average',
    }),
    width: SamagraScaller({
      value: 50,
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
