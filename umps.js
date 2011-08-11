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
	'+', function() { var x = this; return function(y) { return _(x + y) }},
	'-', function() { var x = this; return function(y) { return _(x - y) }},
	'*', function() { var x = this; return function(y) { return _(x * y) }},
	'/', function() { var x = this; return function(y) { return _(x / y) }},
	'%', function() { var x = this; return function(y) { return _(x % y) }},
	'&', function() { var x = this; return function(y) { return _(x & y) }},
	'|', function() { var x = this; return function(y) { return _(x | y) }},
	'^', function() { var x = this; return function(y) { return _(x ^ y) }},
	',', function() { var x = this; console('log:',this); return function(y) { return [].concat(x,y) }},
	'->', function(y) { var x = this; return function(y) { return window[y] = x }},
	'number', function() { return true }
	)

String.does(
	',', function(y) { var x = this; return function(y) { return _(x.toString() + y.toString()) }},
	'@', function(y) { var x = this; return function(y) { return _(x.toString().charAt(y)) }},
	'number', function() { return this.toString().match(/^\d+$/) ? true : false },
	'string', function() { return this.toString().match(/^'.*'$/) ? true : false },
	'eval', function(selector) { return this[selector].apply(this,arguments.after(0)) }
	)

Array.does(
	'eval', function(selector) { return this[selector].apply(this,arguments.after(0)) },
	',', function(y) { var x = this; return function(y) { return _(x['.array'].concat(y)) }},
	'@', function(y) { var x = this; return function(y) { return _(x['.array'][y]) }}
	)

Object.does(
	'=', function() { var x = this; return function(y) { return x == y }},
	';', function() { return function(y) { return typeof(y) == "function" ? y : _(y) }},
	'@', function(y) { var x = this; return function(y) { return x[y] }},
	'->', function(y) { var x = this; return function(y) { return window[y] = x }},
	'symbol', function() { 
		return this.number() ? this*1 : 
			this.string() ? this :
			this.toString() },
	'number', function() { return false },
	'string', function() { return false },
	'array', function() { return false }
	)

var stack = [];
Array.does(
	'array', function() { return true },
	'do', function() {
		var msg = this.shift();
		var script = "return _(" + msg.symbol() + ")";
		while (this.length > 0) {
			var msg = this.shift();
			script += "('" + msg + "')";
			var arg = this.shift();
			msg == "->" ? 
				script += "('" + arg + "')" :
				script += "(" + arg.symbol() +  ")";
		}
		console('log:',script);
		return Function.constructor.apply(Function,[ script ])();
	})

Function.does(
	'copy', function(o) { for (k in o) if (o.has(k)) this[k] = o[k]; return this },
	'oldToString', Function.prototype.toString,
	'toString', function() { return this.has('.string') ? this['.string'] : this.oldToString() }, 
	'define', function(k) { return window[k] = this }
	)

_ = function() { 
	var _ = function() { return arguments.callee.eval.apply(arguments.callee,arguments) };
	if (arguments[0])
		arguments[0].number() ? _.copy(Number.prototype)('static:','valueOf', arguments[0]) :
		arguments[0].array() ? _.copy(Array.prototype).copy({ '.array' : arguments[0] }) :
		_.copy(String.prototype).copy({ '.string':arguments[0]}) ;
	return _ }

_()('define','compiler')
	('slot:','script')
	('does:','parse:', "s| @('script:', s.split(/\\s+/).removeEmpty())")
	('does:','compile', function() {
		this('script');
		console('log:',this('script'));
	})
	('does:','run', "| console('log:',@('script').do())")

_()("define","os")
	("static:","Console",console)
	("static:","console",_()
		("define","console")
		("does:","log:",'|os("Console").log.apply(os("Console"),arguments)')
		("does:","info:",'|os("Console").info.apply(os("Console"),arguments)')
		("does:","warn:",'|os("Console").warn.apply(os("Console"),arguments)')
		("does:","error:",'|os("Console").error.apply(os("Console"),arguments)')
		("does:","alert:",'m|alert(m)'))
