import {useIsFocused} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AppButton from '../Elements/Button';
import {useTheme} from 'react-native-paper';

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
    // backgroundColor: '#eaeeff',
    justifyContent: 'flex-end',
  },
  container: {
    height: 'auto',
    // backgroundColor: 'white',
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
