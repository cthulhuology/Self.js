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
	('static:','parser',parser)
	('does:','parse:','s | @("tokens:", @("parser")("parse:", s)); ^ @("tokens")')
	('does:','unary:', function(s) { return s.charAt(s.length-1) != ":" })
	('does:','compile', function() {
		var script = '';
		var toks = compiler("tokens");
		for (var i = 0; i < toks.length; ++i) {
			if (i == 0) { 
				if(compiler("unary:",toks[i])){	
					console("log:","unary")
					script += toks[i];
				} else {
					console("error:","not unary")
				}
				
			} else {
				if(compiler("unary:",toks[i])){	
					console("log:","unary");
					script += "('" + toks[i] + "')";
				} else {
					console("log:","not unary");

				}
			}
		}
		return script;
	})
