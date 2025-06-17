import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
  useForm,
} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {size} from '../../Prefrences/Prefrences';
import AppButton from '../Elements/Button';
import {ErrorText} from '../Elements/ErrorText';
import {Input} from '../Elements/Input';

interface FormFieldConfig<TFormValues extends FieldValues>
  extends Omit<ControllerProps<TFormValues>, 'render' | 'control'> {
  name: Path<TFormValues>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'phone' | 'description';
}

interface AppFormProps<TFormValues extends FieldValues> {
  formConfig: Array<FormFieldConfig<TFormValues>>;
  onFormSubmit: (data: TFormValues) => void;
  submitButtonText: string;
  defaultValues?: TFormValues;
  children?: React.ReactNode;
}
// --- END NEW/UPDATED INTERFACES ---

export const AppForm = <TFormValues extends FieldValues>({
  formConfig,
  onFormSubmit,
  submitButtonText,
  defaultValues,
  children,
}: AppFormProps<TFormValues>) => {
  const {colors} = useTheme();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TFormValues>({
    // Pass the Default Values
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* {children} */}

        {formConfig.map((item: any) => (
          <View key={item.name.toString()}>
            <Controller
              control={control as Control<FieldValues>}
              name={item.name}
              rules={item.rules} // Use item.rules directly
              render={({field: {onChange, value}}) => (
                <Input
                  defaultValue={item.defaultValue}
                  label={item.label}
                  placeholder={item.placeholder || `Enter ${item.label}`}
                  value={value as string}
                  onChangeText={onChange}
                  keyboardType={
                    item.type === 'number'
                      ? 'numeric'
                      : item.type === 'email'
                      ? 'email-address'
                      : item.type === 'phone'
                      ? 'phone-pad'
                      : 'default'
                  }
                  secureTextEntry={item.type === 'password'}
                  height={item.type === 'description' ? 80 : 53}
                  multiline={item.type === 'description' ? true : false}
                />
              )}
            />

            {/* Check if an error exists for the current item.name */}
            {errors[item.name as string] && (
              <ErrorText>
                {/* Access the message property of the error object */}
                {(errors[item.name as string] as any)?.message}
              </ErrorText>
            )}
          </View>
        ))}

        <AppButton
          showLoaderFn={true}
          onPress={handleSubmit(onFormSubmit)}
          style={{
            marginTop: size.spacing.s,
          }}
          color="primary">
          {submitButtonText}
        </AppButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// --- BASIC STYLES ---
const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
});
