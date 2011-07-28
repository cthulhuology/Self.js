// umps.js
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
	'+', function() { var x = this; return function(y) { return x + y }},
	'-', function() { var x = this; return function(y) { return x - y }},
	'*', function() { var x = this; return function(y) { return x * y }},
	'/', function() { var x = this; return function(y) { return x / y }},
	'%', function() { var x = this; return function(y) { return x % y }},
	'&', function() { var x = this; return function(y) { return x & y }},
	'|', function() { var x = this; return function(y) { return x | y }},
	'^', function() { var x = this; return function(y) { return x ^ y }},
	',', function() { var x = this.valueOf(); console('log:',this); return function(y) { return [].concat(x,y) }}
	)

String.does(
	',', function(y) { var x = this; return function(y) { return x + y.toString() }},
	'@', function(y) { var x = this; return function(y) { return x.charAt(y) }},
	'=', function(y) { var x = this; return function(y) { window[x] = y }}
	)

Array.does(
	',', function(y) { var x = this; return function(y) { return x.concat(y) }}
	)

Object.does(
	'@', function(y) { var x = this; return function(y) { return x[y] }}
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
		var msg = this.shift();
		var script = "return " + (window.has(msg) ? msg : "'" + msg + "'");
		while (this.length > 0) {
			var msg = this.shift();
			script += "['" + msg + "']()";
			msg = this.shift();
			script += "(" + msg + ")";
		}
		console('log:',script);
		return Function.constructor.apply(Function,[ script ])();
	})
