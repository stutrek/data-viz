import React from 'react';

import styles from './data.css';

class DataSet extends React.PureComponent {
	render () {
		return (<div className={styles.container}>
			<div className={styles.title}>{this.props.dataSet.title}</div>
			<table>
				<thead>
					<tr>{this.props.dataSet.fields.map((field, i) => (<td key={i}>{field}</td>))}</tr>
				</thead>
				<tbody>
					{this.props.dataSet.rows.map((row, i) => {
						return (<tr key={i}>{row.map((val, j) => (<td key={j}>{val}</td>))}</tr>);
					})}
				</tbody>
			</table>
		</div>);
	}
}

export default class DataSetContainer extends React.Component {
	render () {
		return (<div className={this.props.className}>
			{this.props.data.map(dataSet => <DataSet key={dataSet.title} dataSet={dataSet} />)}
		</div>);
	}

}
