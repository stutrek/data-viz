import { Record, Union, Maybe, Any } from 'typed-immutable';

export const Color = Record({
	r: 0,
	g: 0,
	b: 0,
	a: 1
});

export const StringOrNumber = Maybe(Union(String, Number));

export class Rectangle extends Record({
	id: Maybe(String),
	type: 'Rectangle',
	dataSet: Maybe(String),
	x: StringOrNumber,
	y: StringOrNumber,
	width: StringOrNumber,
	height: StringOrNumber,
	minWidth: Number,
	maxWidth: Number,
	minHeight: Number,
	maxHeight: Number,
	color: Any
}) {
	reset (dataSet) {
		let shape = this;
		shape = shape.set('dataSet', dataSet.title);
		if (typeof this.x !== 'number') {
			shape = shape.set('x', dataSet.fields[0]);
		}
		if (typeof this.y !== 'number') {
			shape = shape.set('y', dataSet.fields[0]);
		}
		if (typeof this.height !== 'number') {
			shape = shape.set('height', dataSet.fields[0]);
		}
		if (typeof this.width !== 'number') {
			shape = shape.set('width', dataSet.fields[0]);
		}
		return shape;
	}
}
