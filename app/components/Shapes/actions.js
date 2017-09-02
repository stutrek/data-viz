export const ADD_SHAPE = Symbol('add-shape');
export const REMOVE_SHAPE = Symbol('remove-shape');
export const UPDATE_SHAPE = Symbol('update-shape');

export function addShape (newShape) {
	return {
		type: ADD_SHAPE,
		payload: newShape
	};
}

export function updateShape (newShape) {
	return {
		type: UPDATE_SHAPE,
		payload: newShape
	};
}
