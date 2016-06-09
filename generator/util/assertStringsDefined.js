import { isString } from 'lodash';

export default function assertStringsDefined (values) {
    Object.keys(values).forEach((key) => {
        const val = values[key];
        if (!isString(val)) throw Error('String : required : ' + key);
    });
}