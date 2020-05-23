import { ExcelComponent } from '../../core/ExcelComponent';

export class Header extends ExcelComponent {
	static className = 'excel__header';

	constructor($root, options) {
		super($root, {
			name: 'Header',
			...options,
		});
	}
	toHTML() {
		return `
		<input type="text" class="input" value="Новая таблица"></input>

		<div>

		  <div class="button">
			<span class="material-icons">
			  delete
			</span>
		  </div>

		  <div class="button">
			<span class="material-icons">
			  clear
			</span>
		  </div>

		</div>

		`;
	}
}
