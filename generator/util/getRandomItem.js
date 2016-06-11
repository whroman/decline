import { random } from 'lodash';

const getRandomIndex = (arr) => random(0, arr.length - 1);
const getRandomItem = (arr) => arr[getRandomIndex(arr)];

export default getRandomItem;
