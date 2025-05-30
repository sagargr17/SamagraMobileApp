import { View } from 'react-native';
import { SamagraScaller } from '../../Utilities/CustomMethods';

export const Spacer = ({
  height = SamagraScaller({
    value: 25,
    scaleBy: 'average',
  }),
}) => <View style={{minHeight: height}} />;
