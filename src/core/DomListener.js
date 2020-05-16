import { capitalize } from './utils';

export class DomListener {
	constructor($root, listeners = []) {
		if (!$root) {
			throw new Error(`No $root provider listener`);
		}
		this.$root = $root;
		this.listeners = listeners;
	}

	initDomListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener);
			if (!method) {
				const name = this.name || '';
				throw new Error(`method ${method} is not implemented in ${name}`);
			}
			this[method] = this[method].bind(this);
			this.$root.on(listener, this[method].bind(this));
		});
	}
	removeDomListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener);
			this.$root.off(listener, this[method]);
		});
	}
}

const getMethodName = eventName => {
	return 'on' + capitalize(eventName);
};
