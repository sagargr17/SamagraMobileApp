import React, {useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {ProviderCard} from '../../../Components/Sections/ProviderCard';
import {SamagraScaller} from '../../../Utilities/CustomMethods';
import {SamagraBottomSheet} from '../../../Components/Sections/SamagraBottomSheet';

interface ServiceListScreenProps {}

export const ServiceListScreen: React.FC<ServiceListScreenProps> = ({}) => {
  const [personalUserDetail, setPersonalDetail] = useState<React.ReactNode>();
  const [isProfileTapped, setIsProfileTapped] = useState<boolean>(true);

  //   setPersonalDetail: React.Dispatch<React.SetStateAction<React.ReactNode>>;

  console.log('USer detail', personalUserDetail);

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
      {true ? (
        <SamagraBottomSheet
          flexHeight={0.4}
          pannigGesture={true}
          title=""
          children={() => personalUserDetail}></SamagraBottomSheet>
      ) : null}
    </>
  );
};
