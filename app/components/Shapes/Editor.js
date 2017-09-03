import React from 'react';

import * as types from './types';

import styles from './styles/editor.css';

function addOptionText (value) {
	if (typeof value === 'number') {
		return 'graph-option-' + value;
	}
	return value;
}

class ShapeEditor extends React.Component {
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

class Line extends ShapeEditor {
	render () {
		let { shape } = this.props;
		let dataSet = this.props.data.find(s => s.title === shape.dataSet);
		return (<div className={styles.container + ' ' + this.props.className}>
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

class Circle extends ShapeEditor {
	render () {
		let { shape } = this.props;
		let dataSet = this.props.data.find(s => s.title === shape.dataSet);
		return (<div className={styles.container}>
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
				<select name="diameter" onChange={this.setValue} value={addOptionText(shape.diameter)}>
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
				switch (true) {
					case shape instanceof types.Line:
						return (<Line
							key={shape.id}
							shape={shape}
							shapeActions={this.props.shapeActions}
							data={this.props.data}
						/>);

					case shape instanceof types.Circle:
						return (<Circle
							key={shape.id}
							shape={shape}
							shapeActions={this.props.shapeActions}
							data={this.props.data}
						/>);

					case shape instanceof types.Rectangle:
						return (<Rectangle
							key={shape.id}
							shape={shape}
							shapeActions={this.props.shapeActions}
							data={this.props.data}
						/>);
				}
			})}
		</div>);
	}
}
