import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { TableSelection } from './Tableselection';
import { $ } from '../../core/dom';
import { matrix, nextSelector } from './tablefunc';

export class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor($root, options) {
		super($root, {
			listeners: ['mousedown', 'keydown', 'input'],
			name: 'Table',
			...options,
		});
		this.unsubs = [];
	}
	prepare() {
		this.selection = new TableSelection();
	}

	toHTML() {
		return createTable(20);
	}
	init() {
		super.init();

		const $cell = this.$root.find('[data-id="0:0"]');
		this.emitted($cell);

		this.$on('formula:input', text => {
			this.selection.current.text(text);
			console.log(text);
		});
		this.$on('formula:done', () => {
			this.selection.current.focus();
		});
	}

	emitted(el) {
		this.selection.select(el);
		this.$emit('table:select', el);
	}

	onMousedown(event) {
		if (event.target.hasAttribute('data-id')) {
			const $target = $(event.target);
			if (event.shiftKey) {
				const $cells = matrix($target, this.selection.current).map(id =>
					this.$root.find(`[data-id="${id}"]`)
				);
				this.selection.selectGroup($cells);
			} else {
				this.selection.select($target);
			}
		}

		if (event.target.dataset.resize) {
			resizeHandler(this.$root, event);
		}
	}
	onKeydown(e) {
		const keys = [
			'Enter',
			'Tab',
			'ArrowLeft',
			'ArrowRight',
			'ArrowDown',
			'ArrowUp',
		];
		const { key } = e;
		if (keys.includes(key) && !e.shiftKey) {
			e.preventDefault();
			const id = this.selection.current.id(true);
			const $next = this.$root.find(nextSelector(key, id));
			this.emitted($next);
		}
	}
	onInput(e) {
		this.$emit('table:input', $(e.target));
	}
}
