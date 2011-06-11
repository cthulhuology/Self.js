// self.js
//
// © 2011 David J. Goehrig
// All Rights Reserved

Object.prototype.can = function(x) { return typeof(this[x]) == 'function' };

Object.prototype.has = function(x) { return this.hasOwnPrototype(x) };

Object.prototype.static = function(x,y) { 
	this[x.replace(/\*$/,"")] = function() { return y };
	return this;
}

Object.prototype.slot = function(x,y) {
	this['.' + x] = y;
	this[x.replace(/\*$/,"")] = function() { return this['.' + x] };
	this[x.replace(/\*$/,"")+":"] = function(y) { this['.' + x] = y; return this }
	return this;
}

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

String.prototype.compile = function() {
	var parts = this.split("|");
	return Function.constructor.apply(Function,parts[0].split(/\s/).concat(parts[1]).filter(function(x) { return x != "" }))
}

Function.prototype.eval = function(selector) {
	return this[selector].apply(this,arguments.after(0));
}

Function.prototype.does = function(selector,definition) {
	this[selector] = definition.compile();
	return this;
}

_ = function() { 
	var _ = function() { return arguments.callee.eval.apply(arguments.callee,arguments) };
	if (arguments[0]) window[arguments[0]] = _;
	return _;
}

