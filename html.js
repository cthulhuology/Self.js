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

_('HTML')
	('slot:','e')
	('does:','element:', 'x| @(e: ,document.body.appendChild(document.createElement(x)))')
	('does:','contains:','s,x,y| @(e).innerHTML = s.substr(x,y)')
	('does:','style:','o| for(var k in o) if (o.has(k)) @(e).style[k] = o[k]')
	('does:','to:','x,y| @(e).style.top = y + "px"; @(e).style.left = x + "px"')
	('does:','on:', 'M,F| var self = this; \
		@(does: ,M,F); \
		@(e).addEventListener(M, function(E) { if (self.can(M)) self(M,E) }, false)')
