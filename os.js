// os.js
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

_("os")
	("static:","Console",console)
	("static:","console",_("console")
		("does:","log:",'|os("Console").log.apply(os("Console"),arguments)')
		("does:","info:",'|os("Console").info.apply(os("Console"),arguments)')
		("does:","warn:",'|os("Console").warn.apply(os("Console"),arguments)')
		("does:","error:",'|os("Console").error.apply(os("Console"),arguments)')
		("does:","alert:",'m|alert(m)'))
