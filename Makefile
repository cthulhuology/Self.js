
.PHONY: wc

wc: 
	@cat *.js | grep -v "^//" | grep -v "^\s*$$"  | wc -l
