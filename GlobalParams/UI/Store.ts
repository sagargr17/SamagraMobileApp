import {useNavigation} from '@react-navigation/native';

const navigation = useNavigation<any>();

export const manageStorepoppedCardParams = [
  {
    onPress: console.log('asdsad'),
    variant: 'large',
    iconName: 'dolly',
    comment: 'Create, Update,  Delete  & More on Products ',
    title: 'Products',
  },
];
