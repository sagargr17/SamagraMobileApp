// This is the testing screen for code sippets andn will dump while production

import React from 'react';
import LoginForm from '../../../Components/Layout/LoginForm';
import {RootStackNavigationProp} from '../../../Navigators/RootStackNavigator';
// import useGetClient from '../../../Client/Graphql/PublicClient'; // GetPublicClient,

interface LoginScreenProps {
  navigation: RootStackNavigationProp<'TestScreen'>;
}

// const client = useGetClient();
export const TestScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  // const testDAta = async () => {
  //   (await client())
  //     .query({
  //       query: getPublicItems,
  //     })
  //     .then(x => console.log('Resultttt', x))
  //     .catch(error => console.log('Error:::', error));
  // };

  return (
    <>
      {/* <Button onPress={() => testDAta()}>Call</Button> */}
      <LoginForm navigation={navigation}></LoginForm>

      {/* <SamagraAlert title="Title1" description="allabour"></SamagraAlert> */}
    </>
  );
};
