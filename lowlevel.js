// lowlevel.js
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

// Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array

var toString = function() {
	var results = "";
	for (var i = 0; i < this.length; ++i) results += String.fromCharCode(this[i]);
	return results;
}

var map = function(Class) {
	return Function.constructor.apply(Function,[ 'f',"var results = new " + Class + "(this.length); for (var i = 0; i < this.length; ++i) results[i] = f(this[i]); return results;" ]);
}

Uint8Array.does('map', map('Uint8Array'),'toString',toString);
Int8Array.does('map', map('Int8Array'),'toString',toString);
Uint16Array.does('map', map('Uint16Array'),'toString',toString);
Int16Array.does('map', map('Int16Array'),'toString',toString);
Uint32Array.does('map', map('Uint32Array'),'toString',toString);
Int32Array.does('map', map('Int32Array'),'toString',toString);
Float32Array.does('map', map('Float32Array'),'toString',toString);

String.does(
	'bytes', function() {
		return new Uint8Array(this.list().map(function(x) { return x.charCodeAt(0) }));
	})

Array.does(
	'pack', function(m) {
		switch(m) {
			case "c": return new Int8Array(this);
			case "C": return new Uint8Array(this);
			case "s": return new Int16Array(this);
			case "S": return new Uint16Array(this);
			case "i": return new Int32Array(this);
			case "I": return new Uint32Array(this);
			case "f": return new Float32Array(this);
			default:
				console('error:',"Invaild pack command: ", m);
		}
	})
