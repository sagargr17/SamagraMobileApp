import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import AppButton from '../elements/Button';
import {useIsFocused} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

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

  useEffect(() => {
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
    backgroundColor: '#eaeeff',
    justifyContent: 'flex-end',
  },
  container: {
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: widthPercentageToDP(4),
    padding: heightPercentageToDP(2),
    paddingTop: heightPercentageToDP(2),
    paddingBottom: heightPercentageToDP(6),
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
    backgroundColor: '#D5D5D5',
  },
  activeLine: {
    backgroundColor: '#1F1F1F',
  },
  title: {
    fontSize: heightPercentageToDP(2),
    color: '#61646B',
    marginBottom: heightPercentageToDP(1),
  },
  content: {
    fontSize: heightPercentageToDP(3),
    color: '#1D1D1D',
    marginBottom: heightPercentageToDP(6),
  },
});

export default GetStarted;
