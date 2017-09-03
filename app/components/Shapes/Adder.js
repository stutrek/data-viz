import React from 'react';

import * as types from './types';

import styles from '../styles/layout.css';

export default class Adder extends React.PureComponent {

	addLine = () => {
		const line = new types.Line({
			thickness: 2,
			color: '#000000'
		}).reset(this.props.data[0]);
		this.props.shapeActions.addShape(line);
	}

	addCircle = () => {
		const circle = new types.Circle({
			diameter: 15,
			minSize: 5,
			maxSize: 30,
			color: '#000000'
		}).reset(this.props.data[0]);
		this.props.shapeActions.addShape(circle);
	}

	addSquare = () => {
		const square = new types.Rectangle({
			width: 15,
			height: 15,
			minWidth: 5,
			maxWidth: 30,
			minHeight: 5,
			maxHeight: 30,
			color: '#000000'
		}).reset(this.props.data[0]);
		this.props.shapeActions.addShape(square);
	}

	render () {
		return (<div className={styles.shapeAdder + ' ' + this.props.className}>
			<button onClick={this.addLine}>Line</button>
			<button onClick={this.addSquare}>Square</button>
			<button onClick={this.addCircle}>Circle</button>
			<button onClick={this.addTriangle}>Triangle</button>
			<button onClick={this.addStar}>Star</button>
			<button onClick={this.addText}>Text</button>
		</div>);
	}
}
