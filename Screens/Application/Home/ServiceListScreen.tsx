import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ProviderCard} from '../../../Components/Sections/ProviderCard';
import {SamagraScaller} from '../../../Utilities/CustomMethods';
import {SamagraBottomSheet} from '../../../Components/Sections/SamagraBottomSheet';
import {TextComponet} from '../../../Components/Elements/TextComponet';
import {PairButtons} from '../../../Components/Sections/PairButtons';

interface ServiceListScreenProps {}

export const ServiceListScreen: React.FC<ServiceListScreenProps> = ({}) => {
  const [personalUserDetail, setPersonalDetail] = useState<React.ReactNode>();
  const [isProfileTapped, setIsProfileTapped] = useState<boolean>(false);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: SamagraScaller({
            value: 10,
            scaleBy: 'height',
          }),
          paddingBottom: SamagraScaller({
            value: 10,
            scaleBy: 'height',
          }),
        }}>
        <ProviderCard
          setIsProfileTapped={setIsProfileTapped}
          setPersonalDetaile={setPersonalDetail}
          priceperhour={Math.floor(Math.random() * 5) + 1}
          distance={Math.floor(Math.random() * 5) + 1}
          rating={Math.floor(Math.random() * 5) + 1}
          titleName="Sita Bhandari"
          image="https://housemaidserviceinkathmandu.com/wp-content/uploads/2024/07/housemaid-service-1024x576.jpg"></ProviderCard>
        <ProviderCard
          setIsProfileTapped={setIsProfileTapped}
          setPersonalDetaile={setPersonalDetail}
          priceperhour={Math.floor(Math.random() * 5) + 1}
          distance={Math.floor(Math.random() * 5) + 1}
          rating={Math.floor(Math.random() * 5) + 1}
          titleName="Rabina Rai"
          image="https://i.pinimg.com/736x/62/fe/f7/62fef704d5435fbba787ee21cfdde605.jpg"></ProviderCard>
        <ProviderCard
          setIsProfileTapped={setIsProfileTapped}
          setPersonalDetaile={setPersonalDetail}
          priceperhour={Math.floor(Math.random() * 5) + 1}
          distance={Math.floor(Math.random() * 5) + 1}
          rating={Math.floor(Math.random() * 5) + 1}
          titleName="Geeta Mahaot"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWz3M3duwwdpruq46TuL-pC5AfCuiz-deiLg&s"></ProviderCard>
        <ProviderCard
          setIsProfileTapped={setIsProfileTapped}
          setPersonalDetaile={setPersonalDetail}
          priceperhour={Math.floor(Math.random() * 5) + 1}
          distance={Math.floor(Math.random() * 5) + 1}
          rating={Math.floor(Math.random() * 5) + 1}
          titleName="Shreya Shrestha "
          image="https://t4.ftcdn.net/jpg/03/53/89/07/360_F_353890760_4TJwWPFZkG0C2EbHdAPQ1JNKokPbKQGE.jpg"></ProviderCard>
        <ProviderCard
          setIsProfileTapped={setIsProfileTapped}
          setPersonalDetaile={setPersonalDetail}
          priceperhour={Math.floor(Math.random() * 5) + 1}
          distance={Math.floor(Math.random() * 5) + 1}
          rating={Math.floor(Math.random() * 5) + 1}
          titleName="Janaki Gahatraj"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKPSpYxVKvGp3PgZsipXAFa-Ldv6jHpN20QQ&s"></ProviderCard>
      </ScrollView>

      {isProfileTapped ? (
        <SamagraBottomSheet
          onClose={() => setIsProfileTapped(!isProfileTapped)}
          isOppen={isProfileTapped}
          // indexValue={isProfileTapped ? 0 : -1}
          flexHeight={0.17}
          pannigGesture={isProfileTapped ? true : false}
          title="Profile Details"
          children={() => (
            <>
              {personalUserDetail}
              <View
                style={{
                  paddingHorizontal: SamagraScaller({
                    value: 16,
                    scaleBy: 'average',
                  }),
                  flex: 1,
                }}>
                <View
                  style={{
                    marginVertical: SamagraScaller({
                      value: 6,
                      scaleBy: 'average',
                    }),
                  }}>
                  <TextComponet
                    title={'E-mail:'}
                    fontVariant="regular"
                    fontSize={18}
                    lineHeight={24}></TextComponet>
                  <TextComponet
                    title={'Ram@gmail.com'}
                    fontVariant="medium"
                    fontSize={18}
                    lineHeight={24}></TextComponet>
                </View>
                <View>
                  <TextComponet
                    title={'Location:'}
                    fontVariant="regular"
                    fontSize={18}
                    lineHeight={24}></TextComponet>
                  <TextComponet
                    title={'Baneswor, Bhimsengola'}
                    fontVariant="medium"
                    fontSize={18}
                    lineHeight={24}></TextComponet>
                </View>
                <View
                  style={{
                    flex: 0.5,
                  }}>
                  <PairButtons
                    onAcceptPress={() => {
                      console.log('Hello World');
                    }}
                    onDeclinPress={() => {
                      console.log('Hello World');
                    }}></PairButtons>
                </View>
              </View>
            </>
          )}></SamagraBottomSheet>
      ) : null}
    </>
  );
};
