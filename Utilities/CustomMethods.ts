import {Dimensions} from 'react-native';
interface InputScale {
  value: number;
  scaleBy?: 'width' | 'height' | 'average';
  minScale?: number;
  maxScale?: number;
  isText?: boolean;
}

export function AreaMapper(input: InputScale): number {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const baseWidth = 393;
  const baseHeight = 852;
  const minScale = input.minScale ?? 0.8;
  const maxScale = input.maxScale ?? 1.2;

  let scaleFactor = 1;

  if (input.scaleBy === 'width') {
    scaleFactor = screenWidth / baseWidth;
  } else if (input.scaleBy === 'height') {
    scaleFactor = screenHeight / baseHeight;
  } else {
    scaleFactor = (screenWidth / baseWidth + screenHeight / baseHeight) / 2;
  }

  // Adjust scale factor for text
  if (input.isText) {
    scaleFactor = Math.pow(scaleFactor, 0); // Use a less aggressive power scale for fonts
  }

  const clampedScaleFactor = Math.min(
    Math.max(scaleFactor, minScale),
    maxScale,
  );

  return input.value * clampedScaleFactor;
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
    console.log();

    return str;
  }
};

export const titleRange = (
  str: any,
  totalDisplayNumber: number = 15,
): string => {
  if (typeof str !== 'string') {
    return titleCase('');
  }

  const ELLIPSIS = '...';
  const effectiveTotalDisplayNumber = Math.max(
    totalDisplayNumber,
    ELLIPSIS.length,
  );

  if (str.length <= effectiveTotalDisplayNumber) {
    return titleCase(str);
  }

  const maxContentLength = effectiveTotalDisplayNumber - ELLIPSIS.length;

  if (maxContentLength <= 0) {
    return titleCase(ELLIPSIS.substring(0, effectiveTotalDisplayNumber));
  }

  const words = str.split(' ');
  const firstWord = words[0];

  if (firstWord.length >= maxContentLength) {
    return titleCase(firstWord.substring(0, maxContentLength) + ELLIPSIS);
  }

  let processedContent = firstWord;

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    if (processedContent.length + 1 + word.length <= maxContentLength) {
      processedContent += ' ' + word;
    } else {
      break;
    }
  }

  return titleCase(processedContent + ELLIPSIS);
};

export const isValidUrl = (url: string) => {
  try {
    new URL(url);

    return true;
  } catch (error) {
    return false;
  }
};
