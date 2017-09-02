
import {
	ADD_SHAPE,
	REMOVE_SHAPE,
	UPDATE_SHAPE
} from './actions';

export default function (state=[], action) {
	switch (action.type) {
		case ADD_SHAPE:
			var shape = action.payload.set('id', Math.random().toString());
			state = [...state, shape];
			break;

		case UPDATE_SHAPE:
			state = state.map(s => s.id === action.payload.id ? action.payload : s);
			break;

		case REMOVE_SHAPE:
			state = state.filter(s => s.id !== action.payload.id);
	}

	return state;
}
