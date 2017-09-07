export const ADD_DATA = Symbol('add-data');

import scale from './Scale';


export function addCsv (rawData, title) {
    var rows = rawData.split('\n').map(line => line.trim().split(','));

    var fields = rows[0];
    rows = rows.splice(1);

    var scales = {};

    fields.forEach((field, i) => {
        scales[field] = scale(rows.map(a => a[i]));
    });

    var data = {
        fields,
        rows,
        scales,
        title
    };

    return {
        type: ADD_DATA,
        payload: data
    };
}