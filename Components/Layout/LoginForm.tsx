import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import Authenticator from '../../Client/Authenticator';
import {RootStackNavigationProp} from '../../Navigators/RootStackNavigator';

interface LoginFormProps {
  onLogin?: (data: LoginData) => void;
  navigation: RootStackNavigationProp<'LoginForm'>;
}

interface LoginData {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({onLogin, navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginData>();

  // navigation.navigate("")

  const onSubmit = async (data: LoginData) => {
    console.log('Login Data:', data.email, data.password);
    let login = await Authenticator(data.email, data.password);
    console.log('Login Result:::', login);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Username is required',
          // pattern: {value: /\S+@\S+\.\S+/, message: 'Invalid email format'},
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            label="UserName"
            value={value}
            onChangeText={onChange}
            keyboardType="default"
            autoCapitalize="none"
            style={styles.input}
            error={!!errors.email}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: {value: 6, message: 'Minimum 6 characters'},
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            label="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            style={styles.input}
            error={!!errors.password}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <Button
        mode="contained"
        onPress={() => {
          handleSubmit(onSubmit);
          // console.log('NAVIGATIONSSSS');
        }}
        // onPress={() => {
        //   // console.log('Resulttttttt....');
        //   // console.log('Resultttt', onSubmit);
        // }}
        style={styles.button}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 20},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {marginBottom: 10},
  button: {marginTop: 10},
  errorText: {color: 'red', fontSize: 12, marginBottom: 5},
});

export default LoginForm;
