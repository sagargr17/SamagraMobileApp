import {View} from 'react-native';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {size} from '../../Prefrences/Prefrences';

export const Spacer = ({height = size.spacing.xs}) => (
  <View style={{minHeight: height}} />
);
