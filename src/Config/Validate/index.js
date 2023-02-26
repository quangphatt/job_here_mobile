export const ValidateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

export const ValidateUTF8Name = (text) => {
  var regex = /[\s\p{Alpha}\p{M}-]+/gu;
  const check = regex.exec(text);
  if (check && check[0] === text) return true;
  else return false;
};

export const ValidatePassword = (password) => {
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return regex.test(password);
};

export const ValidateDateOfBirth = (date) => {
  var dob = new Date(date);
  var month_diff = Date.now() - dob.getTime();
  var age_dt = new Date(month_diff);
  var year = age_dt.getUTCFullYear();
  var age = Math.abs(year - 1970);

  return month_diff > 0 && typeof age === 'number' && age >= 18 && age <= 100;
};

export const ValidatePhone = (phone) => {
  const regex = /(03|05|07|08|09|01)+([0-9]{8})\b/;
  return regex.test(phone);
};

export const ValidateAuthCode = (code) => {
  const regex = /^[0-9]{1,6}$/;
  return regex.test(code);
};
