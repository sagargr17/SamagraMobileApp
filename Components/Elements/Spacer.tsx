import {View} from 'react-native';
import {AreaMapper} from '../../Utilities/CustomMethods';

export const Spacer = ({
  height = AreaMapper({
    value: 25,
    scaleBy: 'average',
  }),
}) => <View style={{minHeight: height}} />;
