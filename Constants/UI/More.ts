import {useNavigation} from '@react-navigation/native';

const navigation = useNavigation<any>();



let variant: 'large' | 'small';
variant = 'large';


export const manageStorepoppedCardParams = [
  {
    onPressHandle: () => console.log('asdsad'),
    variant: variant,
    iconName: 'dolly',
    comment: 'Create, Update,  Delete  & More on Products ',
    title: 'Products',
  },

  {
    onPress: () => {},
    iconName: 'account-hard-hat',
    comment: 'Create, Update,  Delete  & More on Services ',
    variant: variant,
    title: 'Services',
  },

  {
    onPress: () => {},
    iconName: 'truck-delivery',
    comment: 'Accept or Delete User Request',
    variant: variant,
    title: 'Pending Orders',
  },
  {
    onPress: () => {},
    iconName: 'truck-delivery',
    comment: 'Offer Your Live Orders',
    variant: variant,
    title: 'Live Orders',
  },
  {
    onPress: () => {},
    iconName: 'tray-full',
    comment: 'Update Your Stock Items',
    variant: variant,
    title: 'Manage Stocks',
  },
  {
    onPress: () => {},
    iconName: 'clipboard-list',
    comment: 'All Your Customer Deals',
    variant: variant,
    title: 'History',
  },
];
