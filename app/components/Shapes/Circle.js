import React from 'react';

import { Record, Maybe, Any } from 'typed-immutable';

import { StringOrNumber } from './types';
import { ShapeEditor } from './Editor';
import { getPoints } from './util';

const pixelRatio = window.devicePixelRatio || 1;

export const type = 'Circle';

export class Icon extends React.Component {
	render () {
		return (<span>Circle</span>);
	}
}

export function render (context, width, height, shape, data) {
	const values = getPoints(width, height, shape, data);

	values.forEach((point, i) => {
		var diameter;
		if (shape.diameter === null) {
			diameter = 15;
		} else if (typeof shape.diameter === 'number') {
			diameter = shape.diameter;
		} else {
			var sizeRange = shape.maxSize - shape.minSize;
			var diameterIndex = data.fields.indexOf(shape.diameter);
			var pointDiameter = data.scales[shape.diameter](data.rows[i][diameterIndex]);
			diameter = (sizeRange * pointDiameter) + shape.minSize;
		}

		const radius = (diameter / 2) * pixelRatio;
		const x = point[0];
		const y = point[1];

		context.beginPath();
		context.arc(x, height - y, radius, 0, 2 * Math.PI, false);
		context.fillStyle = shape.color;
		context.fill();

	});
}

export class Model extends Record({
	id: Maybe(String),
	type: 'Circle',
	dataSet: Maybe(String),
	x: StringOrNumber,
	y: StringOrNumber,
	diameter: Maybe(StringOrNumber),
	minSize: 10,
	maxSize: 20,
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
		if (typeof this.diameter !== 'number') {
			shape = shape.set('diameter', dataSet.fields[0]);
		}
		return shape;
	}
}

export class Editor extends ShapeEditor {
	render () {
		let { shape } = this.props;
		let dataSet = this.props.data.find(s => s.title === shape.dataSet);
		return (<div className={this.props.styles.container}>
			<div>Circle</div>
			<div>
				<select name="dataSet" onChange={this.updateDataSet} value={shape.dataSet}>
					{this.props.data.map(set => <option key={set.title}>{set.title}</option>)}
				</select>
			</div>
			<div>
				x:
				<select name="x" onChange={this.setValue} value={shape.x}>
					{dataSet.fields.map(option => <option key={option}>{option}</option>)}
				</select>
			</div>
			<div>
				y:
				<select name="y" onChange={this.setValue} value={shape.y}>
					{dataSet.fields.map(option => <option key={option}>{option}</option>)}
				</select>
			</div>
			<div>
				diameter:
				<select name="diameter" onChange={this.setValue} value={this.addOptionText(shape.diameter)}>
					{dataSet.fields.map(option => <option key={option}>{option}</option>)}
					<option value="graph-option-5">Small</option>
					<option value="graph-option-15">Medium</option>
					<option value="graph-option-30">Large</option>
				</select>
			</div>
			<div>
				color:
				<input name="color" type="color" onChange={this.setValue} value={shape.color} />
			</div>
		</div>);
	}
}

