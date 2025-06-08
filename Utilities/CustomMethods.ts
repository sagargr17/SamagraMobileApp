import {Dimensions} from 'react-native';

interface InputScale {
  value: number;
  scaleBy: 'width' | 'height' | 'average';
}

export function AreaMapper(input: InputScale): number {
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

export default function DateTimeToAgoTime(dateTime: string) {
  let timeDelta = Date.now() - Date.parse(dateTime);

  return timeDelta < 1000 * 60
    ? 'Just Now'
    : timeDelta < 1000 * 60 * 60
    ? Math.ceil(timeDelta / (1000 * 60)) + ' Minutes Ago'
    : timeDelta < 1000 * 60 * 60 * 24
    ? Math.ceil(timeDelta / (1000 * 60 * 60)) + ' Hours Ago'
    : timeDelta < 1000 * 60 * 60 * 24 * 365
    ? Math.ceil(timeDelta / (1000 * 60 * 60 * 24)) + ' Days Ago'
    : Math.ceil(timeDelta / (1000 * 60 * 60 * 24 * 365)) + ' Years Ago';
}

export function formatPrice(price: string) {
  return parseFloat(price).toFixed(2);
}

export const titleCase = (str: any) => {
  if (str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  } else {
    return str;
  }
};

export const titleRange = (str: any) => {
  if (typeof str !== 'string') {
    return titleCase('');
  }

  let processedStr: string;

  if (str.length > 15) {
  const parts = str.split(' ');
    const firstWord = parts[0];
    const secondWord = parts[1];

    // Check if first word + space + second word length > 15
    if (
      firstWord.length +
        (secondWord ? secondWord.length : 0) +
        (secondWord ? 1 : 0) >
      15
    ) {
      // If first word length > 5, AND you want "first 4 chars + ..."
      if (firstWord.length > 5) {
        processedStr = firstWord.substring(0, 4) + '...'; // Take first 4 chars and add "..."
      } else {
        // If first word length <= 5, and overall is long, keep first word + "..."
        processedStr = firstWord + ' ...';
      }
    } else {
      // If overall string is long but first two words are not excessively long
      processedStr =
        firstWord + (secondWord ? ' ' + secondWord + ' ...' : '...');
    }
  } else {
    processedStr = str;
  }

  return titleCase(processedStr);
};
