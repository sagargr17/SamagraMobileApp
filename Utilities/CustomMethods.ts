import {Dimensions} from 'react-native';

interface InputScale {
  value: number;
  scaleBy: 'width' | 'height' | 'average';
}

export function SamagraScaller(input: InputScale): number {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const baseWidth = 393;
  const baseHeight = 852; //This is the height and wid

  let scaleFactor = 1;

  if (input.scaleBy === 'width') {
    scaleFactor = screenWidth / baseWidth;
  } else if (input.scaleBy === 'height') {
    scaleFactor = screenHeight / baseHeight;
  } else if (input.scaleBy === 'average') {
    scaleFactor = (screenWidth / baseWidth + screenHeight / baseHeight) / 2;
  }

  return input.value * scaleFactor;
}
