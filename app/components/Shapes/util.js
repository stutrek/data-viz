export function	getPoints (width, height, shape, data) {
	console.log(data);
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
