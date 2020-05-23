import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
		this.emitter = options.emitter;
		this.prepare();
		this.unsubscribers = [];
	}
	// настройка компонента до init
	prepare() {}
	//  Возвращает шаблон компонента
	toHTML() {
		return '';
	}
	// обобщение метода emit
	$emit(event, ...args) {
		this.emitter.emit(event, ...args);
	}
	// обобщение subscribe
	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn);
		this.unsubscribers.push(unsub);
	}

	// добаление дом-слушателей
	init() {
		this.initDomListeners();
	}
	// удаление компонента, очистка слушателя
	destroy() {
		this.removeDomListeners();
		this.unsubscribers.forEach(unsub => unsub());
	}
}
