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

Object.prototype.can = function(x) { return typeof(this[x]) == 'function' };
Object.prototype.has = function(x) { return this.hasOwnProperty(x) };

Object.prototype.after = function(i) {
	var retval = [];
	for (++i;i < this.length;++i) retval.push(this[i]);
	return retval;
}

Object.prototype.list = function() {
	var retval = [];
	for (var i = 0; i < this.length; ++i) retval.push(this[i]);
	return retval;
}

Array.prototype.eval = function() {
	var self = eval(this[0]);
	return self.apply(self, this.after(0));
}

String.prototype.eval = function() {
	return this.split(/\s+/).eval();
}

String.prototype.compile = function() {
	var parts = this.split("|");
	var params = parts.shift().split(/\s/);
	var body = parts.join("|");
	while(body.match(/@/)) body = body.replace(/@\((\w+:*)(.*)\)/gm,'this("$1"$2)');
	if (! body.match(/return /)) body += "; return this";
	return Function.constructor.apply(Function,params.concat(body).filter(function(x) { return x != "" }))
}

Function.prototype.eval = function(selector) {
	return this[selector].apply(this,arguments.after(0));
}

Function.prototype['does:'] = function(selector,definition) {
	this[selector] = definition.compile();
	return this;
}

Function.prototype['static:'] = function(x,y) { 
	this[x.replace(/\*$/,"")] = function() { return y };
	return this;
}

Function.prototype['slot:'] = function(x,y) {
	this['.' + x] = y;
	this[x.replace(/\*$/,"")] = function() { return this['.' + x]};
	this[x.replace(/\*$/,"")+":"] = function(y) { this['.' + x] = y; return this };
	return this;
}

_ = function() { 
	var _ = function() { return arguments.callee.eval.apply(arguments.callee,arguments) };
	if (arguments[0]) window[arguments[0]] = _;
	return _;
}

