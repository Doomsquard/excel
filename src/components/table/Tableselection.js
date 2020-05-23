export class TableSelection {
	static className = 'selected';
	constructor() {
		this.group = [];
		this.current = null;
	}
	select($el) {
		this.clear();
		this.group.push($el);
		this.current = $el;
		$el.focus().classAdd(TableSelection.className);
	}
	clear() {
		this.group.forEach(i => i.classRemove(TableSelection.className));
		this.group = [];
	}
	selectGroup($group = []) {
		this.clear();
		this.group = $group;
		this.group.forEach(i => i.classAdd('selected'));
	}
	debugger;
}
