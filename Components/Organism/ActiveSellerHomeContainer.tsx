import FastImage from '@d11/react-native-fast-image';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {size} from '../../Prefrences/Prefrences';
import {useAppSelector} from '../../StateManagement/hooks';
import {AreaMapper, titleCase} from '../../Utilities/CustomMethods';
import {AppText} from '../Elements/AppText';
import {Spacer} from '../Elements/Spacer';
import {BubbleCard} from '../Molecules/Cards/BubbleCard';
import {ListCard} from '../Molecules/Cards/ListCard';
interface ActiveSellerHomeScreenProps {}

export const ActiveSellerHomeScreen: React.FC<
  ActiveSellerHomeScreenProps
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
        <Spacer height={20} />
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
            <AppText
              customStyle={{
                fontSize: AreaMapper({value: 28}),
                lineHeight: AreaMapper({value: 42}),
              }}
              title={titleCase(selectedUserData.username)}
              fontSizeVariant="title"
              fontVariant="medium"></AppText>
            <AppText title={'4.8 (120 reviews)'}></AppText>
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
        <Spacer height={15}></Spacer>
        <AppText
          title="Overview"
          fontVariant="heavy"
          fontSizeVariant="display"
          customStyle={{
            fontSize: 22,
            paddingVertical: 10,
          }}></AppText>
        <BubbleCard
          customStyle={{
            backgroundColor: '#FFDB6F',
            borderWidth: 1,
            borderColor: 'white',
          }}
          iconName={'alert-circle'}
          title="No Service Added"
          variant="large"
          comment="Please Add services"></BubbleCard>
        <Spacer height={8}></Spacer>
        <RowFlexLayout>
          <ListCard
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
              },
            ]}></ListCard>
          <ListCard
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
                value: '$2,500',
                type: 'display',
                fontVariant: 'medium',
              },
            ]}></ListCard>
        </RowFlexLayout>
        <Spacer height={15}></Spacer>
        <ListCard
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
          ]}></ListCard>
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
        <Spacer height={10}></Spacer>
        <AppText
          title="Quick Actions"
          fontVariant="heavy"
          customStyle={{
            fontSize: 22,
            paddingVertical: 10,
          }}></AppText>

        <Spacer height={16}></Spacer>

        <RowFlexLayout>
          <BubbleCard
            customStyle={{
              elevation: 0,
              paddingVertical: size.spacing.xs,
            }}
            title="View Booking"
            iconName={'calendar-month-outline'}
            variant="small"></BubbleCard>
          <BubbleCard
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
            variant="small"></BubbleCard>
        </RowFlexLayout>
        <RowFlexLayout>
          <BubbleCard
            customStyle={{
              elevation: 0,
              paddingVertical: size.spacing.xs,
            }}
            title="Earning Report"
            iconName={'calendar-month-outline'}
            variant="small"></BubbleCard>
          <BubbleCard
            onPress={() => {
              navigation.navigate('CategoriesScreen');
            }}
            customStyle={{
              elevation: 0,
              paddingVertical: size.spacing.xs,
            }}
            title="Add Services"
            iconName={'plus'}
            variant="small"></BubbleCard>
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
