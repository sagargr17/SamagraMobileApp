import React from 'react';
import {ScrollView, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {ImageSliderModal} from '../../../Components/Sections/ImageSliderModal';
import {Spacer} from '../../../Components/Elements/Spacer';
import {TextComponet} from '../../../Components/Elements/TextComponet';
import {titleCase} from '../../../Utilities/CustomMethods';
import {
  HomeDetailScreenRouteProp,
  HomeStackNavigationProp,
} from '../../../Navigators/Stack/HomeStackNavigator';

interface HomeDetailScreenProps {
  // route: HomeDetailScreenRouteProp;
}

export const HomeDetailScreen: React.FC<HomeDetailScreenProps> = ({}) => {
  return (
    <>
      <ImageSliderModal
        images={[
          {
            url: 'https://images.pexels.com/photos/592815/pexels-photo-592815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          },
          {
            url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          },
          {
            url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdhdGNofGVufDB8fDB8fHww',
          },
        ]}></ImageSliderModal>
      <Spacer></Spacer>
      <Divider></Divider>
      <Spacer></Spacer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}>
        <View>
          <TextComponet
            title={titleCase('asjdjksadh')}
            fontVariant="regular"></TextComponet>
        </View>
      </ScrollView>
    </>
  );
};
