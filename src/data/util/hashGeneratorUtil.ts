export const generateUUID = (text: string) => {
  return Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + text;
};
