// html.js
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

$ = document.querySelector;

_('HTML')
	('slot:','tag')
	('does:','element:', 'x| @("tag:",document.body.appendChild(document.createElement(x)))')
	('does:','contains:','s,x,y| @("tag").innerHTML = s.substr(x,y)')
	('does:','add:','e | @("tag").appendChild(e)')
	('does:','style:','o| for(var k in o) if (o.has(k)) @("tag").style[k] = o[k]')
	('does:','to:','x,y| @("tag").style.top = y + "px"; @("tag").style.left = x + "px"')
	('does:','src:','u | @("tag").src = u')
	('does:','id:','i | window[i] = @("tag"); @("tag").id = i')
	('does:','class:','c | @("tag").className = c')
	('does:','on:', 'M,F| var self = this; \
		@("does:",M,F); \
		@("tag").addEventListener(M, function(E) { if (self.can(M)) self(M,E) }, false)')
