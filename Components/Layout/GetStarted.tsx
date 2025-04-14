import {useIsFocused} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AppButton from '../Elements/Button';
import {useTheme} from 'react-native-paper';
import {SamagraScaller} from '../../Utilities/CustomMethods';

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
    <SafeAreaView style={styles.wrapper}>
      <FastImage
        onLoadStart={() => <ActivityIndicator></ActivityIndicator>}
        style={{
          height: 400,
          width: widthPercentageToDP(100),
          // backgroundColor: 'orange',
          flex: 2,
        }}
        source={{
          uri:
            step === 1
              ? 'https://images.unsplash.com/photo-1624372635310-01d078c05dd9?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              : 'https://images.pexels.com/photos/4107286/pexels-photo-4107286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    height: 'auto',
    // backgroundColor: "orange",
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
});

export default GetStarted;
