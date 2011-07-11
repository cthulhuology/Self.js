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

HTML("element:","textarea")("id:","editor")
	('style:', {position: 'absolute',width: '100%', height: '80%', top: 0, left: 0 })

HTML("element:","button")("id:","doit")("contains:","Do it!")
	('style:',{position: 'absolute',width: '30%', height: '10%', top: '85%', left: '35%'  })
	('on:','click',function(e) {
		if (compiler("script")) compiler("run");
	})

HTML("element:","button")("id:","compit")("contains:","Compile it!")
	('style:',{position: 'absolute',width: '30%', height: '10%', top: '85%', left: '5%' })
	('on:','click',function(e) { 
		console("log:", compiler("parse:", editor.value));
		console("log:", compiler("compile"));
		
	})

HTML("element:","button")("id:","clearit")("contains:","Clear it!")
	('style:',{position: 'absolute',width: '30%', height: '10%', top: '85%', left: '65%'  })
