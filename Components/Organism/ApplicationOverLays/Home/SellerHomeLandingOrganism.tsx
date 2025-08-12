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
          marginHorizontal: size.spacing.xs,
        }}>
        <SpacerElement height={20} />
        <RowFlexLayout
          customStyle={{
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <FastImage
            style={{
              height: AreaMapper({value: 128}),
              width: AreaMapper({value: 128}),
              borderWidth: 1,
              marginRight: size.spacing.m,
              borderRadius: size.borderRadius.full,
            }}
            source={{
              uri: selectedUserData.pofileImageUrl,
            }}></FastImage>
          <View>
            <AppTextElement
              customStyle={{
                fontSize: AreaMapper({value: 28}),
                lineHeight: AreaMapper({value: 42}),
              }}
              title={titleCase(selectedUserData.username)}
              fontSizeVariant="title"
              fontVariant="medium"></AppTextElement>
            <AppTextElement title={'4.8 (120 reviews)'}></AppTextElement>
          </View>
        </RowFlexLayout>
      </View>
    );
  }, []);

  // Over View
  const Overview = useMemo(() => {
    return (
      <View
        style={{
          marginHorizontal: size.spacing.xs,
        }}>
        <SpacerElement height={15}></SpacerElement>
        <AppTextElement
          title="Overview"
          fontVariant="heavy"
          fontSizeVariant="display"
          customStyle={{
            fontSize: 22,
            paddingVertical: 10,
          }}></AppTextElement>
        <BubbleCardMolecule
          customStyle={{
            backgroundColor: '#FFDB6F',
            borderWidth: 1,
            borderColor: 'white',
          }}
          iconName={'alert-circle'}
          title="No Service Added"
          variant="large"
          comment="Please Add services"></BubbleCardMolecule>
        <SpacerElement height={8}></SpacerElement>
        <RowFlexLayout>
          <ListCardMolecule
            customStyle={{
              paddingVertical: size.spacing.l,
              paddingHorizontal: size.spacing.m,
              width: AreaMapper({value: 182, scaleBy: 'width'}),
              height: AreaMapper({value: 134, scaleBy: 'width'}),
            }}
            id="1"
            list={[
              {
                value: 'Total Earnings',
                type: 'display',
                fontVariant: 'medium',
              },
              {
                value: '$2,500',
                type: 'display',
                fontVariant: 'medium',
                style: {
                  fontSize: AreaMapper({value: 25}),
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
                type: 'display',
                fontVariant: 'medium',
              },
              {
                value: '5',
                type: 'display',
                fontVariant: 'medium',
              },
            ]}></ListCardMolecule>
        </RowFlexLayout>
        <SpacerElement height={15}></SpacerElement>
        <ListCardMolecule
          customStyle={{
            paddingVertical: size.spacing.l,
            paddingHorizontal: size.spacing.m,
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
              type: 'display',
              fontVariant: 'medium',
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
          marginHorizontal: size.spacing.xs,
        }}>
        <SpacerElement height={10}></SpacerElement>
        <AppTextElement
          title="Quick Actions"
          fontVariant="heavy"
          customStyle={{
            fontSize: 22,
            paddingVertical: 10,
          }}></AppTextElement>

        <SpacerElement height={16}></SpacerElement>

        <RowFlexLayout>
          <BubbleCardMolecule
            customStyle={{
              elevation: 0,
              paddingVertical: size.spacing.xs,
            }}
            title="View Booking"
            iconName={'calendar-month-outline'}
            variant="small"></BubbleCardMolecule>
          <BubbleCardMolecule
            onPress={() => {
              // navigation.navigate('BottomTab', {
              //   screen: 'Home',
              //   params: {
              //     screen: 'ManageServices',
              //   },
              // });
              navigation.navigate('ManageServices');
            }}
            customStyle={{
              elevation: 0,
              paddingVertical: size.spacing.xs,
            }}
            title="Manage Services"
            iconName={'format-list-bulleted'}
            variant="small"></BubbleCardMolecule>
        </RowFlexLayout>
        <RowFlexLayout>
          <BubbleCardMolecule
            customStyle={{
              elevation: 0,
              paddingVertical: size.spacing.xs,
            }}
            title="Earning Report"
            iconName={'calendar-month-outline'}
            variant="small"></BubbleCardMolecule>
          <BubbleCardMolecule
            onPress={() => {
              navigation.navigate('CategoriesScreen');
            }}
            customStyle={{
              elevation: 0,
              paddingVertical: size.spacing.xs,
            }}
            title="Add Services"
            iconName={'plus'}
            variant="small"></BubbleCardMolecule>
        </RowFlexLayout>
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
