import {showMessage} from 'react-native-flash-message';

export const verifiedPassword = async (username: string, otp: string) => {};

export const registerUser = async (user: {
  username: 'string';
  password: 'string';
  email: 'string';
  phoneNumber: 'string';
}) => {
  try {
    const response = await fetch(
      `http://identity.samagranepal.com/api/v1/account/Register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: user.username,
          password: user.password,
          email: user.email,
          phoneNumber: user.phoneNumber,
        }).toString(),
      },
    );

    if (response.ok) {
      showMessage({
        message: 'User Create ',
        type: 'success',
      });
      if (!response.ok) {
        showMessage({
          message: 'User cant  Create ',
          type: 'danger',
        });
      }
    }
  } catch (e) {
    if (e) {
      showMessage({
        message: 'User cant  Create ',
        type: 'danger',
      });
    }
  }
};
