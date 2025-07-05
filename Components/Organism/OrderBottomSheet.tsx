import {useMutation} from '@apollo/client';
import React from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {CreateItemRequestMutation} from '../../GraphQL/Mutation/ItemRequestMutation';
import {RootStackNavigationProp} from '../../Navigators/RootStackNavigator';
import {responseTheme, size} from '../../Prefrences/Prefrences';
import {showLoader} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {
  postOrderparams,
  SentordersParams,
} from '../../StateManagement/Orders/SentOrderParams';
import {AppBottomSheet} from '../Molecules/Global/AppBottomSheet';
import {AppForm} from './AppForm';
import {ItemCategoryCardSlider} from './ItemCategorySlider';
import {SamagraLoader} from '../Molecules/Response/SamagraLoader';
import {GetAuthenticateClient} from '../../client/Graphql/AuthenticatedClient';
import {ScrollView} from 'react-native-gesture-handler';
import {Spacer} from '../Elements/Spacer';
import {Divider, Surface} from 'react-native-paper';
import {BubbleCard} from '../Molecules/Cards/BubbleCard';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useTheme} from '@react-navigation/native';
import {AreaMapper} from '../../Utilities/CustomMethods';

interface OrderBottomSheetProps {
  navigation: RootStackNavigationProp<'ApplicationOverlay'> | any;
}

export const OrderBottomSheet: React.FC<OrderBottomSheetProps> = ({
  navigation,
}) => {
  type childrenContent = () => React.ReactNode;
  const dispatch = useAppDispatch();
  const [createItemRequestFn, {loading}] = useMutation(
    CreateItemRequestMutation,
  );
  const {colors} = useTheme();

  const handleSubmit = (data: SentordersParams) => {
    // dispatch(showLoader());
    console.log('Calling the function');
    // createItemRequestFn({
    //   variables: {
    //     itemName: data.name,
    //     categoryID: '1',
    //   },
    // })
    //   .then(res => {
    //     console.log('response Create Items', res);
    //     console.log('Order Created', res.data?.createItemRequest?.id);
    //     // Dispatch
    //     dispatch(
    //       postOrderparams({
    //         location: data.location,
    //         description: data.description,
    //         requiredTime: '2',
    //         name: data.name,
    //         category: '1',
    //         id: res.data?.createItemRequest?.id ?? '',
    //       }),
    //     );
    //     // Navigation
    //     navigation.navigate('ApplicationOverlay', {
    //       screen: 'ReceivedOfferListScreen',
    //     });
    //   })
    //   .catch(err => {
    //     console.log('Message', err);

    //     showMessage(
    //       responseTheme('Something Went Wrong', 'PLease Try again', 'danger'),
    //     );
    //   });

    navigation.navigate('ApplicationOverlay', {
      screen: 'ReceivedOfferListScreen',
    });
  };

  const childrenContent = () => {
    const userLocation = useAppSelector(
      state => state.user.userLocation?.address,
    );

    return (
      <View
        style={{
          backgroundColor: colors.background,
        }}>
        <Spacer></Spacer>
        <BubbleCard
          iconColor={colors.primary}
          iconName="account-group"
          title="1259 Active Provider Currently !"
          variant="large"
          comment="28 Near Your Location"></BubbleCard>
        <ItemCategoryCardSlider sizes="regular"></ItemCategoryCardSlider>
        <Spacer height={15}></Spacer>
        <AppForm<SentordersParams>
          formConfig={[
            {
              name: 'location',
              type: 'text',
              label: 'Location',

              defaultValue: userLocation,
            },
            {
              name: 'name',
              type: 'text',
              label: 'Your Need',
              rules: {
                required: 'Name is required',
              },
            },
            {
              name: 'description',
              type: 'text',
              label: 'Note',
              rules: {
                required: 'Note is required',
              },
            },
          ]}
          customBottonPositionStyle={{
            marginBottom: size.spacing.s,
          }}
          onFormSubmit={handleSubmit}
          disabled={loading ? true : false}
          submitButtonText={`${loading ? 'loading' : 'Search'}`}></AppForm>
      </View>
    );
  };

  return (
    <AppBottomSheet
      isOppen={true}
      pannigGesture={false}
      children={childrenContent}
      flexHeight={1}
      title="Buy"></AppBottomSheet>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // paddingBottom: size.spacing.m,
    // marginTop: size.spacing.l,
  },
});
