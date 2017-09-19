import React from 'react';
import { Record, Maybe, Any } from 'typed-immutable';

import { StringOrNumber } from './types';
import { ShapeEditor } from './Editor';
import { getPoints } from './util';

const pixelRatio = window.devicePixelRatio || 1;

export const type = 'Line';

export class Icon extends React.Component {
	render () {
		return (<span>Line</span>);
	}
}

export function render (context, width, height, shape, data) {
	const values = getPoints(width, height, shape, data);
	context.beginPath();
	context.moveTo(values[0][0], height - values[0][1]);
	values.forEach((point) => {
		const x = point[0];
		const y = point[1];
		context.lineTo(x, height - y);
	});
	context.strokeStyle = shape.color;
	context.lineWidth = shape.thickness * pixelRatio;
	context.stroke();

}

export class Model extends Record({
	id: Maybe(String),
	type: 'Line',
	dataSet: Maybe(String),
	x: StringOrNumber,
	y: StringOrNumber,
	thickness: '2',
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
		if (typeof this.thickness !== 'number') {
			shape = shape.set('thickness', dataSet.fields[0]);
		}
		return shape;
	}
}


export class Editor extends ShapeEditor {
	render () {
		let { shape } = this.props;
		let dataSet = this.props.data.find(s => s.title === shape.dataSet);
		return (<div className={this.props.styles.container + ' ' + this.props.className}>
			<div>Line</div>
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
				thickness:
				<input name="thickness" type="number" onChange={this.setValue} value={shape.thickness}/>
			</div>
			<div>
				color:
				<input name="color" type="color" onChange={this.setValue} value={shape.color} />
			</div>
		</div>);
	}
}

