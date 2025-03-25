import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import AppButton from '../Elements/Button';
import {useIsFocused} from '@react-navigation/native';

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
    borderRadius: 12,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 60,
  },
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  line: {
    width: 50,
    height: 4,
    borderRadius: 58,
    backgroundColor: '#D5D5D5',
  },
  activeLine: {
    backgroundColor: '#1F1F1F',
  },
  title: {
    fontSize: 16,
    color: '#61646B',
    marginBottom: 10,
  },
  content: {
    fontSize: 33,
    color: '#1D1D1D',
    marginBottom: 40,
  },
});

export default GetStarted;
