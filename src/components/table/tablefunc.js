function range(start, end) {
	start > end ? ([end, start] = [start, end]) : null;
	return new Array(end - start + 1).fill('').map((_, index) => start + index);
}

export function matrix($target, $current) {
	const target = $target.id(true);
	const current = $current.id(true);
	const cols = range(target.col, current.col);
	const rows = range(target.row, current.row);
	return cols.reduce((acc, col) => {
		rows.forEach(row => acc.push(`${row}:${col}`));
		return acc;
	}, []);
}

export function nextSelector(key, { col, row }) {
	const MIN_VALUE = 0;

	switch (key) {
		case 'Enter':
		case 'ArrowDown':
			row++;
			break;
		case 'Tab':
		case 'ArrowRight':
			col++;
			break;
		case 'ArrowLeft':
			col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
			break;
		case 'ArrowUp':
			row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
			break;
		default:
			return { col, row };
	}

	return `[data-id="${row}:${col}"]`;
}
