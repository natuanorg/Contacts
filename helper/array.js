import { isNil} from 'lodash';
export const toggleToArray = (arr, obj, field = 'id') => {
    const exist = arr.find((e) => e[field] === obj[field]);
    return !isNil(exist) ? arr.filter((e) => e[field] !== obj[field]) : [...arr, obj]
}