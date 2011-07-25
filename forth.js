// forth.js
//
// © 2011 David J. Goehrig
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
// 

Number.does(
	'+', function(y) { return [ this + y*1 ].concat(stack.after(1)) },
	'-', function(y) { return [ y*1 - this ].concat(stack.after(1)) },
	'*', function(y) { return [ this * y*1 ].concat(stack.after(1)) },
	'/', function(y) { return [ y*1 / this ].concat(stack.after(1)) },
	'%', function(y) { return [ y*1 % this ].concat(stack.after(1)) },
	'&', function(y) { return [ this & y*1 ].concat(stack.after(1)) },
	'|', function(y) { return [ this | y*1 ].concat(stack.after(1)) },
	'^', function(y) { return [ this ^ y*1 ].concat(stack.after(1)) }
	)

String.does(
	',', function(y) { return [ this + y ].concat(stack.after(1)) },
	'@', function(y) { return [ this.charAt(y) ].concat(stack.after(1)) }
	)

Array.does(
	',', function(y) { return [ this.concat(y) ].concat(stack.after(1)) },
	'@', function(y) { return [ this[y] ].concat(stack.after(1)) }
	)

Object.does(
	'@', function(y) { return [ this[y] ].concat(stack.after(1)) }
	)

_('compiler')
	('slot:','script')
	('does:','parse:', "s| @('script:', s.split(/\\s+/).removeEmpty())")
	('does:','compile', function() {
		this('script');
		console('log:',this('script'));
	})
	('does:','run', "| console('log:',@('script').eval())")


var stack = [];
Array.does(
	'eval', function() {
		stack = [];
		while (this.length > 0) {
			var msg = this.shift();
			var tos = stack[0];
			if (tos === undefined) stack.unshift(window[msg] ? eval(msg) : msg)
			else if (tos.can(msg)) stack = tos[msg].apply(tos,stack.after(0));
			else if (typeof(window[msg]) == 'function') window[msg].apply(window[msg],stack);
			else stack.unshift(msg);	
		}
		return stack;
	})
