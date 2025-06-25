import {showMessage} from 'react-native-flash-message';

const registerUserEndpoint =
  'http://identity.samagranepal.com/api/v1/account/Register';
const verifiedPhoneNumber =
  'http://identity.samagranepal.com/api/v1/account/VerifyPhoneNumber';

// verifiedPassword
export const verifiedPassword = async (username: string, otp: string) => {
  console.log('USerNAme', username, otp);

  const response = await fetch(verifiedPhoneNumber, {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // },
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      verificationCode: '000000',
    }),
  });
  console.log('Response????', response);

  return response;
};

// RegisterUser
export const registerUser = async (user: {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}) => {
  try {
    console.log('USEr', user);

    const response = await fetch(registerUserEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }),
    });

    if (response.ok) {
      showMessage({
        message: 'User Create ',
        type: 'success',
      });
      return 200;
    }
    if (!response.ok) {
      showMessage({
        message: 'User cant  Create ',
        type: 'danger',
      });
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
