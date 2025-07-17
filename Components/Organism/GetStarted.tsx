import FastImage from '@d11/react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  GetStartedFirstImage,
  GetStartedSecondImage,
} from '../../Constants/UI/AssetsUrls';
import { AreaMapper } from '../../Utilities/CustomMethods';
import AppButton from '../Elements/Button';

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
        <AppButton onPress={next}>{activeItem?.buttonText}</AppButton>
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
    borderTopEndRadius: AreaMapper({value: 4, scaleBy: 'height'}),
    padding: AreaMapper({value: 2, scaleBy: 'height'}),
    paddingTop: AreaMapper({value: 2, scaleBy: 'height'}),
    borderWidth: 0.1,
    paddingBottom: AreaMapper({value: 4, scaleBy: 'height'}),
  },
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: AreaMapper({value: 2, scaleBy: 'width'}),
    marginBottom: AreaMapper({value: 2, scaleBy: 'height'}),
  },
  line: {
    width: AreaMapper({value: 12, scaleBy: 'height'}),
    height: AreaMapper({value: 0.4, scaleBy: 'height'}),
    borderRadius: AreaMapper({value: 12, scaleBy: 'width'}),
    // backgroundColor: '#D5D5D5',
  },
  activeLine: {
    backgroundColor: '#1F1F1F',
  },
  title: {
    fontSize: AreaMapper({value: 2, scaleBy: 'height'}),
    color: '#61646B',
    marginBottom: AreaMapper({value: 1, scaleBy: 'height'}),
    fontFamily: 'Poppins-Medium',
  },
  content: {
    fontSize: AreaMapper({value: 3, scaleBy: 'height'}),
    color: '#1D1D1D',
    marginBottom: AreaMapper({value: 6, scaleBy: 'height'}),
    fontFamily: 'Poppins-Regular',
    fontWeight: 'regular',
  },

  headerimage: {
    flex: 1.5,
  },
});

export default GetStarted;
