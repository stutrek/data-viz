export class Scale {

	constructor (initialValues) {
		initialValues.forEach(val => this.add(val));
	}

	lowest = Infinity
	highest = -Infinity

	add (value) {
		if (this.lowest > value) {
			this.lowest = value;
		}
		if (this.highest < value) {
			this.highest = value;
		}
	}

	scale (value, lowest) {
		if (lowest === undefined) {
			lowest = this.lowest;
		}
		const range = this.highest - lowest;
		const rangedValue = value - lowest;

		return (rangedValue / range);
	}
}

export default function (initialValues) {
	const scale = new Scale(initialValues);

	return (value, lowest) => scale.scale(value, lowest);
}
