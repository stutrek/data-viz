import React from 'react';

import shapes from '../Shapes';

import styles from './styles/editor.css';

function addOptionText (value) {
	if (typeof value === 'number') {
		return 'graph-option-' + value;
	}
	return value;
}

export class ShapeEditor extends React.Component {

	addOptionText = addOptionText

	setValue = (event) => {
		let value = event.target.value;

		if (value.startsWith('graph-option-')) {
			value = parseFloat(value.replace('graph-option-', ''));
		}

		const updatedShape = this.props.shape.set(event.target.name, value);
		this.props.shapeActions.updateShape(updatedShape);
	}

	updateDataSet = (event) => {
		const dataSet = this.props.data.find(s => s.title === event.target.value);
		let updatedShape = this.props.shape.reset(dataSet);
		this.props.shapeActions.updateShape(updatedShape);
	}
}

ShapeEditor.defaultProps = {
	styles
};

class Rectangle extends ShapeEditor {
	render () {
		let { shape } = this.props;
		let dataSet = this.props.data.find(s => s.title === shape.dataSet);
		return (<div className={styles.container}>
			<div>Rectangle</div>
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
				width:
				<select name="width" onChange={this.setValue} value={addOptionText(shape.width)}>
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

export default class Shapes extends React.PureComponent {
	render () {
		return (<div className={this.props.className}>
			{this.props.shapes.map(shape => {
				let Component = shapes[shape.type].Editor;
				return (<Component
					key={shape.id}
					shape={shape}
					shapeActions={this.props.shapeActions}
					data={this.props.data}
				/>);
			})}
		</div>);
	}
}
