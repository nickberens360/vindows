export const creditCardLast4 = [
  (value) => value?.length >= 4 || 'Enter 4 digits',
];
export const nullableCreditCardLast4 = [
  (value) => !value || value?.length >= 4 || 'Enter 4 digits',
];
export const noSpecialCharacters = [
  (value) => {
    const pattern =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

    return (value || '').length > 0
      ? pattern.test(value) || 'No Special Characters Allowed'
      : true;
  },
];
export const phoneNumber = [
  (value) => {
    const pattern = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

    return (value || '').length > 0
      ? pattern.test(value) || 'Invalid phone number'
      : true;
  },
];
export const requiredPhoneNumber = [
  (value) => !!value || 'Phone required',
  (value) =>
    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(value) ||
    'Phone Number must be valid',
];
export const required = (val) => val === 0 || !!val || '*Required';
export const transactionAmount = [
  (value) => value > -1 || 'Cannot be negative',
];
export const nullableTransactionAmount = [
  (value) => !value || value > -1 || 'Cannot be negative',
];
export const validEmail = [
  (value) => (value || '').length <= 100 || 'Max 100 characters',
  (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (value || '').length > 0
      ? pattern.test(value) || 'Invalid e-mail'
      : true;
  },
];
