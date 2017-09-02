import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Data from './Data';
import ShapeAdder from './Shapes/Adder';
import ShapeEditor from './Shapes/Editor';
import Graph from './Graph';

import * as shapeActions from './Shapes/actions';

import styles from './styles/layout.css';

class Layout extends React.Component {
	render () {
		return (<div className={styles.container}>
			<div className={styles.data}>
				<Data data={this.props.data} />
			</div>
			<div className={styles.graphBuilder}>
				<ShapeAdder
					className={styles.shapeAdder}
					shapeActions={this.props.shapeActions}
					data={this.props.data}
				/>
				<Graph className={styles.graph}
					shapes={this.props.shapes}
					data={this.props.data}
				/>
				<ShapeEditor
					className={styles.shapeEditor}
					data={this.props.data}
					shapes={this.props.shapes}
					shapeActions={this.props.shapeActions}
				/>
			</div>
		</div>);
	}
}

function mapStoreToProps (store) {
	return {
		data: store.data,
		shapes: store.shapes
	};
}

function mapDispatchToProps (dispatch) {
	return {
		shapeActions: bindActionCreators(shapeActions, dispatch)
	};
}

export default connect(mapStoreToProps, mapDispatchToProps)(Layout);
