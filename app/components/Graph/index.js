import React from 'react';

import shapes from '../Shapes';

import styles from './graph.css';

const pixelRatio = window.devicePixelRatio || 0;

export default class Graph extends React.PureComponent {

	componentDidUpdate () {
		this.renderGraph();
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
			let data = this.props.data.find(s => s.title === shape.dataSet);
			shapes[shape.type].render(context, width, height, shape, data);
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
