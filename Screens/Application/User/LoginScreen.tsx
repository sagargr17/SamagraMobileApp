import React from 'react';
import LoginForm from '../../../Components/Layout/LoginForm';
import {RootStackNavigationProp} from '../../../Navigators/RootStackNavigator';
import useGetClient from '../../../Client/Graphql/PublicClient'; // GetPublicClient,
import {getPublicItems} from '../../../GraphQL/Queries/ItemQueries';
import {Button} from 'react-native-paper';

interface LoginScreenProps {
  navigation: RootStackNavigationProp<'LoginForm'>;
}

const client = useGetClient();
export const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const testDAta = async () => {
    (await client())
      .query({
        query: getPublicItems,
      })
      .then(x => console.log('Resultttt', x))
      .catch(error => console.log('Error:::', error));
  };

  return (
    <>
      <Button onPress={() => testDAta()}>Call</Button>
      {/* <LoginForm navigation={navigation}></LoginForm> */}

      {/* <SamagraAlert title="Title1" description="allabour"></SamagraAlert> */}
    </>
  );
};
