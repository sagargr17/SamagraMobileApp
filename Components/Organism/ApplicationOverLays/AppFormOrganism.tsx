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
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {size} from '../../../Prefrences/Prefrences';
import AppButtonElement from '../../Elements/ButtonElement';
import {ErrorTextElement} from '../../Elements/ErrorTextElement';
import {InputElement} from '../../Elements/InputElement';

interface FormFieldConfig<TFormValues extends FieldValues>
  extends Omit<ControllerProps<TFormValues>, 'render' | 'control'> {
  name: Path<TFormValues>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'phone' | 'description';
  icon?: any;
  onFocus?: () => void;
}

interface AppFormOrganismProps<TFormValues extends FieldValues> {
  formConfig: Array<FormFieldConfig<TFormValues>>;
  onFormSubmit: (data: TFormValues) => void;
  submitButtonText: string;
  defaultValues?: TFormValues;
  header?: any;
  children?: React.ReactNode;
  disabled?: boolean;
  customBottonPositionStyle?: ViewStyle;
}
// --- END NEW/UPDATED INTERFACES ---

export const AppFormOrganism = <TFormValues extends FieldValues>({
  formConfig,
  onFormSubmit,
  submitButtonText,
  defaultValues,
  header,
  children,
  disabled,
  customBottonPositionStyle,
}: AppFormOrganismProps<TFormValues>) => {
  const {colors} = useTheme();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TFormValues>({
    // Pass the Default Values
  });

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          StickyHeaderComponent={header}>
          {/* {children} */}

          {formConfig.map((item: any) => (
            <View key={item.name.toString()}>
              <Controller
                control={control as Control<FieldValues>}
                name={item.name}
                rules={item.rules} // Use item.rules directly
                render={({field: {onChange, value}}) => (
                  <View>
                    <InputElement
                      left={item.icon ?? item.icon}
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
                      onFocus={item.onFocus}
                    />
                  </View>
                )}
              />

              {/* Check if an error exists for the current item.name */}
              {errors[item.name as string] && (
                <ErrorTextElement>
                  {/* Access the message property of the error object */}
                  {(errors[item.name as string] as any)?.message}
                </ErrorTextElement>
              )}
            </View>
          ))}
          <View style={customBottonPositionStyle}>
            <AppButtonElement
              disabled={disabled}
              showLoader={false}
              onPress={handleSubmit(onFormSubmit)}
              style={[
                {
                  marginTop: size.spacing.s,
                },
              ]}
              color="primary">
              {submitButtonText}
            </AppButtonElement>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// --- BASIC STYLES ---
const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
});
