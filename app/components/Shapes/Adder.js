import React from 'react';

import shapes from '../Shapes';

import styles from '../styles/layout.css';

export default class Adder extends React.PureComponent {

	add = (type) => {
		this.props.shapeActions.addShape(new shapes[type].Model({
			dataSet: this.props.data[0].title,
			color: '#000000',
			x: this.props.data[0].fields[0],
			y: this.props.data[0].fields[0],
			z: this.props.data[0].fields[0],
		}));
	}
	render () {
		return (<div className={styles.shapeAdder + ' ' + this.props.className}>
			{Object.values(shapes).map(type => {
				return (<button
					key={type.type}
					onClick={() => this.add(type.type)}
				>
					<type.Icon />
				</button>);
			})}
		</div>);
	}
}
