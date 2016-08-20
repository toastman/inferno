import { render } from './../rendering';
import innerHTML from './../../../tools/innerHTML';
import createElement from './../../core/createElement';

describe('Select / select multiple (non-JSX)', () => {
	let container;

	beforeEach(() => {
		container = document.createElement('div');
	});

	afterEach(() => {
		container.innerHTML = '';
	});

	it('should render "select" boolean on select options with numbers', () => {
		const template = (val) => createElement('select', {
			multiple: true,
			value: val
		}, createElement('option', {
			value: 1
		}, 1), createElement('option', {
			value: 2
		}, 2));

		render(template(null), container);
		render(template(), container);
		render(template(2), container);

		expect(container.firstChild.children[ 0 ].selected).to.eql(false);
		expect(container.firstChild.children[ 1 ].selected).to.eql(true);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="1">1</option><option value="2">2</option></select>')
		);

		render(template(1), container);

		expect(container.firstChild.children[ 0 ].selected).to.eql(true);
		expect(container.firstChild.children[ 1 ].selected).to.eql(false);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="1">1</option><option value="2">2</option></select>')
		);

		render(template('foo'), container);

		expect(container.firstChild.children[ 0 ].selected).to.eql(false);
		expect(container.firstChild.children[ 1 ].selected).to.eql(false);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="1">1</option><option value="2">2</option></select>')
		);
	});

	it('should render "select" boolean on select options', () => {

		const template = (val) => createElement('select', {
			multiple: true,
			value: val
		}, createElement('option', {
			value: 'foo'
		}, 'foo'), createElement('option', {
			value: 'bar'
		}, 'bar'));

		render(template({}), container);
		render(template(null), container);
		render(template(undefined), container);
		render(template('foo'), container);
		expect(container.firstChild.children[ 0 ].selected).to.eql(true);
		expect(container.firstChild.children[ 1 ].selected).to.eql(false);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="foo">foo</option><option value="bar">bar</option></select>')
		);
		render(template(undefined), container);
		render(template(null), container);
		expect(container.firstChild.children[ 0 ].selected).to.eql(false);
		expect(container.firstChild.children[ 1 ].selected).to.eql(false);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="foo">foo</option><option value="bar">bar</option></select>')
		);

		render(template('bar'), container);
		expect(container.firstChild.children[ 0 ].selected).to.eql(false);
		expect(container.firstChild.children[ 1 ].selected).to.eql(true);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="foo">foo</option><option value="bar">bar</option></select>')
		);
	});

	it('should render "select" boolean on select options', () => {
		const template = (val) => createElement('select', {
			multiple: true,
			value: val
		}, createElement('option', {
			value: 'foo'
		}, 'foo'), createElement('option', {
			value: 'bar'
		}, 'bar'));

		render(template('foo'), container);
		expect(container.firstChild.children[ 0 ].selected).to.eql(true);
		expect(container.firstChild.children[ 1 ].selected).to.eql(false);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="foo">foo</option><option value="bar">bar</option></select>')// Missing selected markup
		);
	});

	/*
	TODO! Do we need to support this kind of shortcuts, shouldn't user mark options as selected or not like in vanilla JS

	it('should populate the value attribute on select multiple using groups', () => {
		const template = (val) => ({
			tag: 'select',
			attrs: {
				multiple: true,
				value: val
			},
			children: [{
				tag: 'optGroup',
				attrs: {
					label: 'foo-group'
				},
				children: {
					tag: 'option',
					attrs: {
						value: 'foo'
					}
				}
			}, {
				tag: 'optGroup',
				attrs: {
					label: 'bar-group'
				},
				children: {
					tag: 'option',
					attrs: {
						value: 'bar'
					}
				}
			}]
		});

		//render(template(undefined), container);
		render(template([ 'foo', 'bar' ]), container);

		expect(container.firstChild.childNodes[ 0 ].innerHTML).to.eql('<option value="foo"></option>');
		expect(container.firstChild.childNodes[ 1 ].innerHTML).to.eql('<option value="bar"></option>');

		expect(container.firstChild.children[ 0 ].children[ 0 ].selected).to.eql(true);
		expect(container.firstChild.children[ 1 ].children[ 0 ].selected).to.eql(true);

		render(template([]), container);

		expect(container.firstChild.childNodes[ 0 ].innerHTML).to.eql('<option value="foo"></option>');
		expect(container.firstChild.childNodes[ 1 ].innerHTML).to.eql('<option value="bar"></option>');

		expect(container.firstChild.children[ 0 ].children[ 0 ].selected).to.eql(false);
		expect(container.firstChild.children[ 1 ].children[ 0 ].selected).to.eql(false);

		render(template('foo'), container);

		expect(container.firstChild.childNodes[ 0 ].innerHTML).to.eql('<option value="foo"></option>');
		expect(container.firstChild.childNodes[ 1 ].innerHTML).to.eql('<option value="bar"></option>');

		expect(container.firstChild.children[ 0 ].children[ 0 ].selected).to.eql(true);
		expect(container.firstChild.children[ 1 ].children[ 0 ].selected).to.eql(false);

		render(template('bar'), container);

		expect(container.firstChild.childNodes[ 0 ].innerHTML).to.eql('<option value="foo"></option>');
		expect(container.firstChild.childNodes[ 1 ].innerHTML).to.eql('<option value="bar"></option>');

		expect(container.firstChild.children[ 0 ].children[ 0 ].selected).to.eql(false);
		expect(container.firstChild.children[ 1 ].children[ 0 ].selected).to.eql(true);

		render(template(null), container);

		expect(container.firstChild.childNodes[ 0 ].innerHTML).to.eql('<option value="foo"></option>');
		expect(container.firstChild.childNodes[ 1 ].innerHTML).to.eql('<option value="bar"></option>');

		expect(container.firstChild.children[ 0 ].children[ 0 ].selected).to.eql(false);
		expect(container.firstChild.children[ 1 ].children[ 0 ].selected).to.eql(false);
	});
*/
	it('should render "select" boolean on select options', () => {

		const template = (val) => createElement('select', {
			multiple: true,
			value: val
		}, createElement('option', {
			value: 'foo'
		}, 'foo'), createElement('option', {
			value: 'bar'
		}, 'bar'));

		render(template('foo'), container);

		expect(container.firstChild.children[ 0 ].selected).to.eql(true);
		expect(container.firstChild.children[ 1 ].selected).to.eql(false);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="foo">foo</option><option value="bar">bar</option></select>')
		);

		render(template(), container);

		expect(container.firstChild.children[ 0 ].selected).to.eql(false);
		expect(container.firstChild.children[ 1 ].selected).to.eql(false);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="foo">foo</option><option value="bar">bar</option></select>')
		);

	});

	it('should assure the value attribute also set the value property for `textarea`', () => {

		const template = (val) => createElement('textarea', {
			value: val
		});

		render(template('foo'), container);
		expect(container.firstChild.value).to.eql('foo');
		render(template('bar'), container);
		expect(container.firstChild.value).to.eql('bar');
		render(template('bar'), container);
		expect(container.firstChild.value).to.eql('bar');
		render(template('foo'), container);
		expect(container.firstChild.value).to.eql('foo');
		render(template(null), container);
		expect(container.firstChild.value).to.eql('');
		render(template(undefined), container);
		expect(container.firstChild.value).to.eql('');
		render(template('bar'), container);
		expect(container.firstChild.value).to.eql('bar');
		render(template([]), container);
		expect(container.firstChild.value).to.eql('');
		render(template({}), container);
		expect(container.firstChild.value).to.eql('[object Object]');
	});

	it('should handle when multiple values passed in as an array', () => {

		const template = (val) => createElement('select', {
			multiple: true,
			value: val
		}, createElement('option', {
			value: 'a'
		}, 'a'), createElement('option', {
			value: 'b'
		}, 'b'), createElement('option', {
			value: 'c'
		}, 'c'), createElement('option', {
			value: 'd'
		}, 'd'));

		render(template(['a', 'b', 'c']), container);

		expect(container.firstChild.children[ 0 ].selected).to.eql(true);
		expect(container.firstChild.children[ 1 ].selected).to.eql(true);
		expect(container.firstChild.children[ 2 ].selected).to.eql(true);
		expect(container.firstChild.children[ 3 ].selected).to.eql(false);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="a">a</option><option value="b">b</option><option value="c">c</option><option value="d">d</option></select>')
		);
	});

	it('should handle when multiple options with selected set', () => {

		const template = () => createElement('select', {
			multiple: true
		}, createElement('option', {
			value: 'a',
			selected: true
		}, 'a'), createElement('option', {
			value: 'b',
			selected: true
		}, 'b'), createElement('option', {
			value: 'c',
			selected: true
		}, 'c'), createElement('option', {
			value: 'd'
		}, 'd'));

		render(template(), container);

		expect(container.firstChild.children[ 0 ].selected).to.eql(true);
		expect(container.firstChild.children[ 1 ].selected).to.eql(true);
		expect(container.firstChild.children[ 2 ].selected).to.eql(true);
		expect(container.firstChild.children[ 3 ].selected).to.eql(false);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="a">a</option><option value="b">b</option><option value="c">c</option><option value="d">d</option></select>')
		);
	});
});
