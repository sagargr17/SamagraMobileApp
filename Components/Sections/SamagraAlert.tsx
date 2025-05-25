import {useTheme} from '@react-navigation/native';
import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Dialog, Portal, Text} from 'react-native-paper';
import AppButton from '../Elements/Button';

interface AlertProps {
  title: string;
  description: string;
  icon?: string;
  onAgreeHandle?: () => void;
  scrollable?: boolean;
}

export const SamagraAlert: React.FC<AlertProps> = ({
  title,
  description,
  icon = 'alert',
  onAgreeHandle,
  scrollable = false,
}) => {
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(!visible);
  const {colors} = useTheme();

  return (
    <Portal>
      <Dialog
        visible={true}
        onDismiss={hideDialog}
        style={{
          backgroundColor: colors.background,
        }}>
        {!scrollable ? (
          <View>
            <Dialog.Icon icon={'alert'} />
            <Dialog.Title style={styles.title}>{title}</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">{description}</Text>
              {onAgreeHandle ? (
                <AppButton onPress={onAgreeHandle}>OK</AppButton>
              ) : null}
            </Dialog.Content>
          </View>
        ) : (
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
              <Text>This is a scrollable area</Text>
            </ScrollView>
          </Dialog.ScrollArea>
        )}
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
});
