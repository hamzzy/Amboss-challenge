const getRandomInt = (min_num: number, max_num: number) => {
  const min = Math.ceil(min_num);
  const max = Math.floor(max_num);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export default getRandomInt;
