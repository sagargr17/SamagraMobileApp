import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {SingnlePageInfo} from '../../../Components/Organism/SinglePageInfo';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import DateTimeToAgoTime, {
  AreaMapper,
  titleCase,
} from '../../../Utilities/CustomMethods';
import {
  NoCartItemTitle,
  NoItemInShop,
  NotMentioned,
} from '../../../Constants/UI/Messages';
import {FlatListScreen} from '../../../Layout/ScreenLayout/FlatListScreenLayout';
import {ListCard} from '../../../Components/Molecules/Cards/ListCard';
import {ImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {useQuery} from '@apollo/client';
import {getMyOrdersItem} from '../../../GraphQL/Queries/PrivateShopQueries';
import {ListCardSkeleton} from '../../../Components/Skeletons/Layout/ListCardSkeleton';
import {size} from '../../../Prefrences/Prefrences';
import {AppSerchBar} from '../../../Components/Molecules/Global/AppSerchBar';
import {AppBottomSheet} from '../../../Components/Molecules/Global/AppBottomSheet';
import {AppText} from '../../../Components/Elements/AppText';
import {Spacer} from '../../../Components/Elements/Spacer';
import AppButton from '../../../Components/Elements/Button';
import {RowFlexLayout} from '../../../Layout/PartationLayout/RowFlexLayout';

interface OrderScreenProps {}

export const PendingOrderScreen: React.FC<OrderScreenProps> = ({}) => {
  const {colors} = useTheme();
  const route = useRoute<any>();
  const {NoItemFound} = Logos;
  const navigation = useNavigation<any>();
  const {data, loading, error} = useQuery(getMyOrdersItem);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [personalDetail, setPersonalDetail] = useState<{
    id?: string | null;
    itemName: string;
    isCompleted: boolean;
    price: any;
    address: string;
    quantity: number;
    dateTime: any;
    completionDateTime: any;
    phoneNumber: string;
    fullName: string;
    message: string;
  }>();

  const handleNavigation = () => {
    // Navigation navigate
    navigation.navigate('ApplicationOverlay', {
      screen: 'AddItemScreen',
      params: {
        shopId: route.params.shopId,
        shopName: 'Add Item',
      },
    });
  };

  if (loading) return <ListCardSkeleton numberOfList={6}></ListCardSkeleton>;
  if (error) return <Text>Error</Text>;

  const emptyNode = (
    <SingnlePageInfo
      icon={<NoItemFound height={AreaMapper({value: 150})} width={'90%'} />}
      detail={{
        title: NoCartItemTitle,
        message: NoItemInShop,
        onButtonPress: () => handleNavigation(),
        buttonTitle: 'Add Item',
      }}></SingnlePageInfo>
  );

  const child = (
    <View>
      <ListCard
        customStyle={{
          height: AreaMapper({value: 100}),
        }}
        customImageStyle={{
          height: AreaMapper({value: 60}),
        }}
        imageUrl={ImageNotFound}
        id={personalDetail?.id ?? `${Math.random()}`}
        list={[
          {
            value: personalDetail?.itemName ?? NotMentioned,
            type: 'regular',
          },
          {
            value: `Rs.${personalDetail?.price ?? NotMentioned}`,
            type: 'regular',
          },
        ]}></ListCard>
      <Spacer></Spacer>
      <View>
        <AppText
          title="Full Name:"
          fontSizeVariant="title"
          fontVariant="heavy"></AppText>
        <AppText title={personalDetail?.fullName ?? NoItemFound}></AppText>
        <Spacer></Spacer>
        <AppText
          title="Phone:"
          fontSizeVariant="title"
          fontVariant="heavy"></AppText>
        <AppText title={personalDetail?.phoneNumber ?? NoItemFound}></AppText>
        <Spacer></Spacer>
        <AppText
          title="Address:"
          fontSizeVariant="title"
          fontVariant="heavy"></AppText>
        <AppText title={personalDetail?.address ?? NoItemFound}></AppText>
        <Spacer height={20}></Spacer>
        <RowFlexLayout
          customStyle={{
            justifyContent: 'flex-start',
            backgroundColor: colors.card,
            paddingHorizontal: size.spacing.s,
            paddingVertical: size.spacing.m,
            borderWidth: size.borderWidth.xss,
            borderRadius: size.borderRadius.full,
          }}>
          <AppText title="Note:" fontVariant="heavy"></AppText>
          <AppText
            title={`"${personalDetail?.message ?? NoItemFound}"`}
            customStyle={{
              marginLeft: size.spacing.xs,
            }}></AppText>
        </RowFlexLayout>

        <Spacer height={20}></Spacer>
        <AppButton onPress={() => console.log('Pressed')}>Completed</AppButton>
        <Spacer height={10}></Spacer>
      </View>
    </View>
  );

  return (
    <>
      <FlatListScreen
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View
            style={{
              marginVertical: size.spacing.xxs,
            }}>
            <AppSerchBar
              placeHolder="Search By Buyer Name"
              onPress={() => console.log('>>')}></AppSerchBar>
          </View>
        }
        contentContainerStyle={{
          paddingHorizontal: size.spacing.xs,
        }}
        ListEmptyComponent={emptyNode}
        data={data?.getOrders?.nodes}
        renderItem={({item, index}) => (
          <ListCard
            customImageStyle={{
              height: AreaMapper({value: 100}),
            }}
            onImagePress={() => {
              setPersonalDetail({
                itemName: item?.itemName ?? NotMentioned,
                address: item?.address ?? NotMentioned,
                isCompleted: item?.isCompleted ?? false,
                quantity: item?.quantity ?? 2,
                dateTime: item?.dateTime,
                completionDateTime: item?.completionDateTime,
                price: item?.price,
                phoneNumber: item?.phoneNumber ?? NotMentioned,
                fullName: item?.fullName ?? NotMentioned,
                message: item?.message ?? NotMentioned,
              });
              setIsBottomSheetOpen(!isBottomSheetOpen);
            }}
            surfaceLevel={1}
            id={item?.id ?? NotMentioned}
            imageUrl={ImageNotFound}
            list={[
              {
                type: 'regular',
                value: titleCase(item?.itemName ?? NotMentioned),
                fontVariant: 'bold',
              },
              {
                type: 'regular',
                value: titleCase(item?.address ?? NotMentioned),
                fontVariant: 'regular',
              },

              {
                type: 'regular',
                value: DateTimeToAgoTime(item?.dateTime),
                style: {
                  color: colors.notification,
                },
                fontVariant: 'regular',
              },
              {
                type: 'regular',
                value: `Qty: ${item?.quantity ?? NotMentioned}`,
                fontVariant: 'regular',
                style: {
                  color: colors.background,
                  backgroundColor: 'gray',
                  borderRadius: size.borderRadius.full,
                  paddingHorizontal: size.spacing.xs,
                  paddingVertical: size.spacing.xxs,
                  left: AreaMapper({value: 200}),
                },
              },
            ]}></ListCard>
        )}></FlatListScreen>

      <AppBottomSheet
        onClose={() => setIsBottomSheetOpen(!isBottomSheetOpen)}
        flexHeight={1}
        pannigGesture={true}
        title="Working"
        isOppen={isBottomSheetOpen}
        children={() => {
          return child;
        }}></AppBottomSheet>
    </>
  );
};
