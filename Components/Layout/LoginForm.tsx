import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";

interface LoginFormProps {
  onLogin?: (data: LoginData) => void;
}

interface LoginData {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    console.log("Login Data:", data);
    if (onLogin) onLogin(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Email"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            error={!!errors.email}
          />
        )}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        rules={{ required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } }}
        render={({ field: { onChange, value } }) => (
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
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      {/* Login Button */}
      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { marginBottom: 10 },
  button: { marginTop: 10 },
  errorText: { color: "red", fontSize: 12, marginBottom: 5 },
});

export default LoginForm;
