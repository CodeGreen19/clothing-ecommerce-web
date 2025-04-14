export function generateUniqueString(length = 15) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

export const generateUniqueOTP = () => {
  const digits = "0123456789";

  let otp = "";
  while (otp.length < 5) {
    const randomdigit = digits[Math.floor(Math.random() * digits.length)];
    if (!otp.includes(randomdigit)) {
      otp += randomdigit;
    }
  }
  return otp;
};
