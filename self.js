// self.js
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

Object.prototype.does = function() { 
	for (var i = 0; i < arguments.length; i += 2) this.prototype[arguments[i]] = arguments[i+1]
};

Object.does(
	'can',function(x) { 
		return typeof(this[x]) == 'function' 
	},
	'has', function(x) { 
		return this.hasOwnProperty(x) 
	},
	'after', function(i) {
		var retval = [];
		for (++i;i < this.length;++i) retval.push(this[i]);
		return retval 
	},
	'list', function() {
		return this.after(0) 
	})

Array.does(
	'eval',function() {
		var self = eval(this[0]);
		return self.apply(self, this.after(0)) 
	},
	'removeEmpty', function() { 
		return this.filter(function(x) { return x != "" })
	})

String.does(
	'get', function(then) {
		var self = this;
		var _request = XMLHttpRequest ? new XMLHttpRequest(): _doc.createRequest();
		_request.onreadystatechange = function() {
               		if (this.readyState != 4) return;
                	if (this.status == 404) then(null);
                	if (this.status == 200) then(this.responseText);
		};
        	_request.open('GET',this,true);
        	_request.send()
	},
	'eval', function() { 
		return this.split(/\s+/).eval() 
	},
	'compile', function() {
		var parts = this.split("|");
		var params = parts.shift().split(/\s/);
		var body = parts.join("|");
		while(body.match(/@/)) body = body.replace(/@/gm,'this');
		while(body.match(/\^/)) body = body.replace(/\^/,"return ");
		if (! body.match(/return /)) body += "; return this";
		return Function.constructor.apply(Function,params.concat(body).removeEmpty())
	},
	'unary', function() {
		return this.charAt(this.length-1) != ":";
	}
	)

Function.does(
	'eval', function(selector) { 
		return this[selector].apply(this,arguments.after(0)) 
	},
	'does:', function(selector,definition) { 
		this[selector] = typeof(definition) == 'string' ?
			definition.compile():
			definition;
		return this 
	},
	'static:', function(x,y) { 
		this[x.replace(/\*$/,"")] = function() { return y };
		return this 
	},
	'slot:', function(x,y) {
		this['.' + x] = y;
		this[x.replace(/\*$/,"")] = function() { return this['.' + x]};
		this[x.replace(/\*$/,"")+":"] = function(y) { this['.' + x] = y; return this };
		return this
	})

_ = function() { 
	var _ = function() { return arguments.callee.eval.apply(arguments.callee,arguments) };
	if (arguments[0]) window[arguments[0]] = _;
	return _ }

