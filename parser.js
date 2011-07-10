// parser.js
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
	
_('parser')
	('does:','parse:', 's | ^ parser("asTokens:", parser("asWords:",s))')
	('does:','asWords:','s | ^ s.split(/\\s+/)')
	('does:','asTokens:',function(a) {
		return [[]].concat(a.
			map(function(X) { 
				return X.split(/([-+!@#$^%&*()=\[\]()<>{}|?\\\/.,'"])/) })).
			reduce(function(X,Y) { 
				return X.concat(Y) }).
			filter(function(Z) { 
				return Z != "" })
		})
