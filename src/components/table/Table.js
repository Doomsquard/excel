import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { $ } from '../../core/dom';

export class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor($root) {
		super($root, {
			listeners: ['mousedown'],
		});
		this.count = 50;
	}

	onMousedown(e) {
		if (e.target.dataset.resize === 'col') {
			const currentrow = e.target.parentNode.dataset.col;
			const queryrow = document.dataset.querySelectorAll(
				`[data-rowresize]=${currentrow}`
			);
			console.log(queryrow);
			const count = e.target.dataset.rowresize;
			console.log(count);
			const $resizercol = $(e.target);
			const startX = e.pageX;
			const elem = $resizercol.$el.closest('[data-type="col"]');
			const widthstart = elem.offsetWidth;
			$resizercol.$el.style.height = document.clientHeight;
			onmousemove = e => {
				const moving = e.pageX;
				const totalwidth = `${moving - startX + widthstart}px`;
				elem.style.width = totalwidth;
			};
			onmouseup = () => {
				onmousemove = null;
			};
		}
		if (e.target.dataset.resize === 'row') {
			const $resizerrow = $(e.target);
			const parentrow = $resizerrow.closest(['[data-type="row"]']);

			const bot = parentrow.getAtribute().$el.bottom;
			const heightY = parentrow.getAtribute().$el.height;
			console.log(parentrow.$el);
			onmousemove = e => {
				const movY = e.pageY;
				parentrow.$el.style.height = `${movY - bot + heightY}px`;
			};
			onmouseup = () => {
				onmousemove = null;
			};
		}
		// 	const startY = e.pageY;
		// 	const elem = e.target.parentNode;
		// 	console.log(elem.offsetHeight);
		// 	const heightstart = elem.offsetWidth;
		// 	document.onmousemove = e => {
		// 		const moving = e.pageY;
		// 		const totalHeight = `${moving - startY + heightstart}px`;
		// 		elem.style.height = totalHeight;
		// 	};

		// }
	}

	toHTML() {
		return createTable(this.count);
	}
}
