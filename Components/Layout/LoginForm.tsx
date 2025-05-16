// import React from 'react';
// import {View, StyleSheet, AppState} from 'react-native';
// import {TextInput, Button, Text} from 'react-native-paper';
// import {useForm, Controller} from 'react-hook-form';
// import Authenticator from '../../client/Token/Authenticator';
// import {RootStackNavigationProp} from '../../Navigators/RootStackNavigator';
// import {accessTokenGenerator} from '../../client/Token/AccessTokenGenerator';
// import {getTokens} from '../../client/Token/TokenAccess';

// interface LoginFormProps {
//   onLogin?: (data: LoginData) => void;
//   navigation: any;
// }

// interface LoginData {
//   userName: string;
//   password: string;
// }

// const LoginForm: React.FC<LoginFormProps> = ({onLogin, navigation}) => {
//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//   } = useForm<LoginData>();

//   const onSubmit = async (data: LoginData) => {
//     console.log('Login Data:', data.userName, data.password);
//     let login = await Authenticator(data.userName, data.password);
//     console.log('Login Result:::', login);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>

//       {/* Email Input */}
//       <Controller
//         control={control}
//         name="userName"
//         rules={{
//           required: 'Username is required',
//           // pattern: {value: /\S+@\S+\.\S+/, message: 'Invalid email format'},
//         }}
//         render={({field: {onChange, value}}) => (
//           <TextInput
//             label="UserName"
//             value={value}
//             onChangeText={onChange}
//             keyboardType="default"
//             autoCapitalize="none"
//             style={styles.input}
//             error={!!errors.userName}
//           />
//         )}
//       />
//       {errors.userName && (
//         <Text style={styles.errorText}>{errors.userName.message}</Text>
//       )}

//       <Controller
//         control={control}
//         name="password"
//         rules={{
//           required: 'Password is required',
//           minLength: {value: 6, message: 'Minimum 6 characters'},
//         }}
//         render={({field: {onChange, value}}) => (
//           <TextInput
//             label="Password"
//             value={value}
//             onChangeText={onChange}
//             secureTextEntry
//             style={styles.input}
//             error={!!errors.password}
//           />
//         )}
//       />
//       {errors.password && (
//         <Text style={styles.errorText}>{errors.password.message}</Text>
//       )}

//       <Button
//         mode="contained"
//         onPress={handleSubmit(onSubmit)}
//         style={styles.button}>
//         Login
//       </Button>
//       <Button
//         onPress={async () => {
//           const {accessToken, refreshToken} = await getTokens();
//           const request = await accessTokenGenerator(
//             refreshToken ? refreshToken : '',
//           );
//         }}>
//         Refresh Token
//       </Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, justifyContent: 'center', padding: 20},
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   input: {marginBottom: 10},
//   button: {marginTop: 10},
//   errorText: {color: 'red', fontSize: 12, marginBottom: 5},
// });

// export default LoginForm;
