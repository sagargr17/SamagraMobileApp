import {View} from 'react-native';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {size} from '../../Prefrences/Prefrences';

export const SpacerElement = ({height = size.spacing.xs}) => (
  <View style={{minHeight: AreaMapper({value: height, scaleBy: 'height'})}} />
);
