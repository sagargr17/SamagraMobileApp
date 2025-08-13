import FastImage from '@d11/react-native-fast-image';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RowFlexLayout} from '../../../../Layout/PartationLayout/RowFlexLayout';
import {size} from '../../../../Prefrences/Prefrences';
import {useAppSelector} from '../../../../StateManagement/hooks';
import {AreaMapper, titleCase} from '../../../../Utilities/CustomMethods';
import {AppTextElement} from '../../../Elements/AppTextElement';
import {SpacerElement} from '../../../Elements/SpacerElement';
import {BubbleCardMolecule} from '../../../Molecules/Cards/BubbleCardMoleCule';
import {ListCardMolecule} from '../../../Molecules/Cards/ListCardMolecule';
import {ImageNotFound} from '../../../../Constants/UI/AssetsUrls';
interface SellerHomeLandingScreenProps {}

export const SellerHomeLandingScreen: React.FC<
  SellerHomeLandingScreenProps
> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const selectedUserData = useAppSelector(state => state.user.Profile);

  // Header
  const header = useMemo(() => {
    return (
      <View
        style={{
          marginHorizontal: size.spacing.s,
        }}>
        <SpacerElement height={16} />
        <RowFlexLayout
          customStyle={[
            {
              alignItems: 'center',
              justifyContent: 'flex-start',
            },
          ]}>
          <FastImage
            style={{
              height: AreaMapper({value: 128}),
              width: AreaMapper({value: 128}),
              borderWidth: size.borderWidth.s,
              marginRight: size.spacing.m,
              borderRadius: size.borderRadius.full,
              borderColor: colors.border,
            }}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOP381N1KxrnWxWOOcghJ6yXg3Gb4R1nvVwg&s',
            }}></FastImage>
          <View>
            <AppTextElement
              customStyle={{
                fontSize: AreaMapper({value: 30}),
                lineHeight: AreaMapper({value: 45}),
              }}
              title={titleCase(selectedUserData.username)}
              fontSizeVariant="title"
              fontVariant="heavy"></AppTextElement>
            <AppTextElement
              title={'4.8 (120 reviews)'}
              fontSizeVariant="title"
              customStyle={{
                color: '#667582',
              }}></AppTextElement>
          </View>
        </RowFlexLayout>
        <SpacerElement height={16} />
      </View>
    );
  }, []);

  // Over View
  const Overview = useMemo(() => {
    return (
      <View
        style={{
          marginHorizontal: size.spacing.s,
        }}>
        <SpacerElement height={20}></SpacerElement>
        <AppTextElement
          title="Overview"
          fontVariant="heavy"
          fontSizeVariant="headline"
          customStyle={{
            paddingTop: size.spacing.m,
            fontSize: AreaMapper({value: 28}),
            lineHeight: AreaMapper({value: 45}),
          }}></AppTextElement>
        <SpacerElement height={12}></SpacerElement>
        <SpacerElement height={16}></SpacerElement>

        <RowFlexLayout
          customStyle={[
            {
              justifyContent: 'flex-start',
              alignItems: 'center',
            },
          ]}>
          <ListCardMolecule
            customStyle={{
              paddingTop: size.spacing.l,
              paddingHorizontal: size.spacing.m,
              width: AreaMapper({value: 182, scaleBy: 'width'}),
              height: AreaMapper({value: 134, scaleBy: 'width'}),
              marginRight: size.spacing.s,
            }}
            id="1"
            list={[
              {
                value: 'Total Earnings',
                type: 'headline',
                fontVariant: 'medium',
              },
              {
                value: '$2,500',
                type: 'headline',
                fontVariant: 'bold',
                style: {
                  marginTop: size.spacing.xs,
                },
              },
            ]}></ListCardMolecule>
          <ListCardMolecule
            customStyle={{
              paddingVertical: size.spacing.l,
              width: AreaMapper({value: 182, scaleBy: 'width'}),
              height: AreaMapper({value: 134, scaleBy: 'width'}),
              paddingHorizontal: size.spacing.m,
            }}
            id="1"
            list={[
              {
                value: 'Upcoming Bookings',
                type: 'headline',
                fontVariant: 'medium',
              },
              {
                value: '5',
                type: 'headline',
                fontVariant: 'bold',
                style: {
                  marginTop: size.spacing.xs,
                },
              },
            ]}></ListCardMolecule>
        </RowFlexLayout>
        <SpacerElement height={15}></SpacerElement>
        <ListCardMolecule
          customStyle={{
            paddingTop: size.spacing.xl,
            paddingHorizontal: size.spacing.m,
            paddingBottom: size.spacing.l,
          }}
          id="1"
          list={[
            {
              value: 'Customer Satisfaction',
              type: 'display',
              fontVariant: 'medium',
            },
            {
              value: '95%',
              type: 'headline',
              fontVariant: 'bold',
              style: {
                marginTop: size.spacing.s,
              },
            },
          ]}></ListCardMolecule>
      </View>
    );
  }, []);

  // Quick Action
  const QuickActions = useMemo(() => {
    const list = [
      {
        icon: 'calendar-month',
      },
    ];

    return (
      <View
        style={{
          marginHorizontal: size.spacing.s,
        }}>
        <SpacerElement height={16}></SpacerElement>
        <AppTextElement
          title="Quick Actions"
          fontVariant="heavy"
          customStyle={{
            fontSize: 22,
            paddingTop: 20,
            paddingBottom: 12,
          }}></AppTextElement>

        <SpacerElement height={16}></SpacerElement>
        <RowFlexLayout>
          <BubbleCardMolecule
            customStyle={{
              elevation: 0,
              paddingVertical: size.spacing.s,
            }}
            title="View Booking"
            iconName={'calendar-month-outline'}
            variant="small"></BubbleCardMolecule>
          <BubbleCardMolecule
            onPress={() => {
              navigation.navigate('ManageServices');
            }}
            customStyle={{
              elevation: 0,
              paddingVertical: size.spacing.s,
            }}
            title="Manage Services"
            iconName={'format-list-bulleted'}
            variant="small"></BubbleCardMolecule>
        </RowFlexLayout>
        <SpacerElement height={12}></SpacerElement>
        <RowFlexLayout>
          <BubbleCardMolecule
            customStyle={{
              elevation: 0,
              paddingVertical: size.spacing.s,
              paddingHorizontal: 0,
            }}
            title="Earning Report"
            iconName={'clipboard-edit-outline'}
            variant="small"></BubbleCardMolecule>
          <BubbleCardMolecule
            onPress={() => {
              navigation.navigate('CategoriesScreen');
            }}
            customStyle={{
              elevation: 0,
              paddingVertical: size.spacing.s,
            }}
            title="Add Services"
            iconName={'plus'}
            variant="small"></BubbleCardMolecule>
        </RowFlexLayout>
        <SpacerElement height={10}></SpacerElement>
      </View>
    );
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {header}
      {Overview}
      {QuickActions}
    </ScrollView>
  );
};
