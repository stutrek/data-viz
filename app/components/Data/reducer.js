import scale from './Scale';
import {
	ADD_DATA
} from './actions';


const initialState = [
	{
		title: 'Set 1',
		fields: ['a', 'b', 'c'],
		rows: [
			[1, 10, 10],
			[2, 7, 30],
			[3, 5, 20],
			[4, 15, 40],
			[5, 20, 35],
			[6, 35, 30]
		]
	},
	{
		title: 'Set 2',
		fields: ['a', 'b', 'c'],
		rows: [
			[1, 22, 5],
			[2, 18, 11],
			[3, 15, 16],
			[4, 10, 28],
			[5, 10, 35],
			[6, 12, 29]
		]
	}
];

initialState[0].scales = {
	a: scale(initialState[0].rows.map(a => a[0])),
	b: scale(initialState[0].rows.map(a => a[1])),
	c: scale(initialState[0].rows.map(a => a[2])),
};

initialState[1].scales = {
	a: scale(initialState[1].rows.map(a => a[0])),
	b: scale(initialState[1].rows.map(a => a[1])),
	c: scale(initialState[1].rows.map(a => a[2])),
};

export default function (state=[], action) {
	switch (action.type) {

		case ADD_DATA:
			state = [...state, action.payload]
	}
	return state;
}

console.log('errr')