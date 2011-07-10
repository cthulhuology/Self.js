// webtk.js
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

_('tk')
	('does:','text:', 's | HTML("element:","span")("contains:", s, 0, s.length)')
	('does:','image:', 'u | HTML("element:","img")("src:",u)')
	('does:','sound:', 'u | HTML("element:","audio")("src:",u)')
	('does:','video:', 'u | HTML("element:","video")("src:",u)')
	('does:','box:', '| HTML("element:","div")')
