export const userRules = {
  phoneRules: {
    required: 'Phone number is required',
    minLength: {
      value: 10,
      message: 'Phone number must be at least 10 digits',
    },
  },
  userName: {
    required: 'Username address is required',
  },
  password: {
    required: 'Password is required',
  },
};

export const orderRequestparamsRules = {
  orderRequestparams: {
    name: 'itemParams.description',
    type: 'text',
    label: 'Descritpion',
    rules: {
      required: 'Location is Required',
    },
  },
};
