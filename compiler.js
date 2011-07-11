// compiler.js
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
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//

_('compiler')
	('slot:','tokens')
	('slot:','script')
	('static:','parser',parser)
	('does:','parse:','s | @("tokens:", @("parser")("parse:", s))("merge"); ^ @("tokens")')
	('does:','merge', function() {
		var toks = compiler("tokens");					// existing tokens
		var ntoks = [];							// new tokens
		var o = 0;
		var l = 0;
		var s = '';
		for ( var i = 0; i < toks.length; ++i) {
			if (toks[i] == "'") {
				o = i;						// start of string
				s = '';
				for ( var j = 1; j < toks.length - i; ++j) {
					if (toks[i+j] == '\\') {
						if (toks[i+j+1] == "'") {	// escaped quote found
							s += "'";	
						}
					} else if( toks[i+j]  == "'" ) {
						ntoks.push(s);					// add the string
						i += (j+1);					// skip the string
						break;
					} else {
						s += toks[i+j] + " ";		// we just append spaces
					}
				}
			} else {
				ntoks.push(toks[i]);				// update the tokens
			}
		}
		compiler("tokens:",ntoks);
		return compiler("tokens");
	})
	('does:','unary:', 's | ^ s.charAt(s.length-1) != ":" ')
	('does:','global:', 's | ^ @("unary:",s) && (typeof(window[s]) == "function")')
	('does:','compile', function() {
		var script = '';
		var toks = compiler("tokens");
		for (var i = 0; i < toks.length; ++i) {
			if (i == 0) {	// NB: only exists so that we can evalute things in a context!
				if (compiler("global:",toks[i])) {
					script += toks[i];
				} else {
					console("error:","Please specify a global! ")
					break;
				}
			} else {	// NB: Remove to here when the object compiler is done!
				if(compiler("unary:",toks[i])){	
					script += "('" + toks[i] + "')";
				} else {
					var args = [];
					script += "('";
					for (var j = 0; j < toks.length -i; ++j) { 	// Look ahead index
						if (compiler("unary:", toks[i+j])) {
							args.push(toks[i+j]);
						} else {
							script += toks[i+j];	
						}
					}
					i += j;
					script += "','" + args.join("','") + "')";
				}
			}
		}
		compiler("script:",script);
		return script;
	})
	('does:','run',function() {
		("|" + compiler("script")).compile()();
	})
