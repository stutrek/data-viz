import React from 'react';

import * as types from '../Shapes/types';

import styles from './graph.css';

const pixelRatio = window.devicePixelRatio || 0;

export default class Graph extends React.PureComponent {

	componentDidUpdate () {
		this.renderGraph();
	}

	getPoints (width, height, shape) {
		let data = this.props.data.find(s => s.title === shape.dataSet);
		const xScale = data.scales[shape.x];
		const yScale = data.scales[shape.y];

		const xIndex = data.fields.indexOf(shape.x);
		const yIndex = data.fields.indexOf(shape.y);

		return data.rows.map(row => {
			return [
				xScale(row[xIndex]) * width,
				yScale(row[yIndex], 0) * height
			];
		});
	}

	renderLine (context, width, height, shape) {
		const values = this.getPoints(width, height, shape);
		context.beginPath();
		context.moveTo(values[0][0], height - values[0][1]);
		values.forEach((point) => {
			const x = point[0];
			const y = point[1];
			context.lineTo(x, height - y);
		});
		context.strokeStyle = shape.color;
		context.stroke();

	}

	renderCircle (context, width, height, shape) {
		const values = this.getPoints(width, height, shape);
		const data = this.props.data.find(s => s.title === shape.dataSet);
		values.forEach((point, i) => {
			var diameter;
			if (typeof shape.diameter === 'number') {
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

	renderRectangle (context, canvasWidth, canvasHeight, shape) {
		const values = this.getPoints(canvasWidth, canvasHeight, shape);
		const data = this.props.data.find(s => s.title === shape.dataSet);
		values.forEach((point, i) => {
			var width;
			if (typeof shape.width === 'number') {
				width = shape.width * pixelRatio;
			} else {
				var sizeRange = shape.maxWidth - shape.minWidth;
				var fieldIndex = data.fields.indexOf(shape.width);
				var pointWidth = data.scales[shape.width](data.rows[i][fieldIndex]);
				width = ((sizeRange * pointWidth) + shape.minWidth) * pixelRatio;
			}

			const radius = (width / 2);
			const x = point[0] - radius;
			const y = point[1] + radius;

			context.beginPath();
			context.rect(x, canvasHeight - y, width, width);
			context.fillStyle = shape.color;
			context.fill();

		});
	}

	renderGraph () {
		const width = this.el.width = this.el.offsetWidth * pixelRatio;
		const height = this.el.height = this.el.offsetHeight * pixelRatio;
		const context = this.el.getContext('2d');

		this.props.shapes.map(shape => {
			switch (true) {
				case shape instanceof types.Line:
					this.renderLine(context, width, height, shape);
					break;

				case shape instanceof types.Circle:
					this.renderCircle(context, width, height, shape);
					break;

				case shape instanceof types.Rectangle:
					this.renderRectangle(context, width, height, shape);
			}
		});
	}

	setElAndRender = (el) => {
		this.el = el;
		this.renderGraph;
	}

	render () {
		return (<div className={styles.container + ' ' + this.props.className}>
			<canvas ref={this.setElAndRender} />
		</div>);
	}
}
