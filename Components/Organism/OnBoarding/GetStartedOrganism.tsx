import FastImage from '@d11/react-native-fast-image';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  GetStartedFirstImage,
  GetStartedSecondImage,
} from '../../../Constants/UI/AssetsUrls';
import AppButtonElement from '../../Elements/ButtonElement';

interface Item {
  id: number;
  title: string;
  content: string;
  buttonText: string;
}

interface GetStartedProps {
  options: Item[];
  onDone: () => void;
}

const GetStarted = ({options, onDone}: GetStartedProps) => {
  const [step, setStep] = useState(0);
  const isFocused = useIsFocused();
  const navigation = useNavigation()

  const activeItem = options[step];

  const next = () => {
    // next step exist
    if (options[step + 1]) {
      setStep(step + 1);
    } else {
      onDone();
    }
  };

  const {colors} = useTheme();

  useMemo(() => {
    
    if (isFocused && options.length > 0) {
      setStep(0);
    }
  }, [isFocused, options]);

  return (
    <View style={styles.wrapper}>   
      <FastImage
        onLoadStart={() => <ActivityIndicator></ActivityIndicator>}
        style={styles.headerimage}
        source={{
          uri: step === 1 ? GetStartedFirstImage : GetStartedSecondImage,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.container}>
        <View style={styles.lineContainer}>
          {options.map((opt, index) => (
            <Text
              key={opt.id}
              style={[styles.line, index === step && styles.activeLine]}
            />
          ))}
        </View>
        <Text style={styles.title}>{activeItem?.title}</Text>
        <Text style={styles.content}>{activeItem?.content}</Text>
        <AppButtonElement onPress={next}>{activeItem?.buttonText}</AppButtonElement>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // justifyContent: 'flex-end',
  },
  container: {
    height: 'auto',
    borderTopEndRadius: widthPercentageToDP(4),
    padding: heightPercentageToDP(2),
    paddingTop: heightPercentageToDP(2),
    borderWidth: 0.1,
    paddingBottom: heightPercentageToDP(4),
  },
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: widthPercentageToDP(2),
    marginBottom: heightPercentageToDP(2),
  },
  line: {
    width: widthPercentageToDP(12),
    height: heightPercentageToDP(0.4),
    borderRadius: widthPercentageToDP(12),
    // backgroundColor: '#D5D5D5',
  },
  activeLine: {
    backgroundColor: '#1F1F1F',
  },
  title: {
    fontSize: heightPercentageToDP(2),
    color: '#61646B',
    marginBottom: heightPercentageToDP(1),
    fontFamily: 'Poppins-Medium',
  },
  content: {
    fontSize: heightPercentageToDP(3),
    color: '#1D1D1D',
    marginBottom: heightPercentageToDP(6),
    fontFamily: 'Poppins-Regular',
    fontWeight: 'regular',
  },

  headerimage: {
    flex: 1.5,
   },
});

export default GetStarted;
