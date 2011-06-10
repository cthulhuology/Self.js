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

//Object.prototype['<-'] = function(x,y) {
//	return this.slot(x,y);
//}

//Object.prototype['='] = function(x,y) {
//	return this.static(x,y);
//}

Object.prototype.after = function(i) {
	var retval = [];
	for (++i;i < this.length;++i) retval.push(this[i]);
	return retval;
}

Object.prototype.send = function(selector) {
	if (typeof(this[selector]) == 'function') 
		return this[selector].apply(this,arguments.after(0));
	return this;
}	

Object.prototype.list = function() {
	var retval = [];
	for (var i = 0; i < this.length; ++i) retval.push(this[i]);
	return retval;
}

Array.prototype.eval = function() {
	return lobby().globals()[this[0]]().send(this[1],this[2]);
}

String.prototype.eval = function() {
	var statement = this.split(/\s/);
	return statement.eval();
}

String.prototype.compile = function() {
	var parts = this.split("->");
	return Function.constructor.apply(Function,parts[0].split(/\s/).concat(parts[1]).filter(function(x) { return x != "" }))
}

Function.prototype.eval = function() {
	return this.apply(this,arguments);
}

window.static('lobby',{});
lobby().static('globals',{});
lobby().globals().static('lobby',lobby());
lobby().globals().static('globals',lobby().globals());
lobby().globals().static('object',new Object());
lobby().globals().static('array',new Array());
lobby().globals().static('block',function() { return Function.constructor.apply(Function,arguments) });
lobby().globals().static('string',String());
lobby().globals().static('number',new Number());


