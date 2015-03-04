var fs = require('fs'); // require file system module

// node will grab filename as argv - enter command "node atoz.js filename.txt"
var filename = process.argv[2];

// throw an error if no filename is found
if (process.argv.length < 3){
	console.log('please enter a filename!');
	process.exit(1);
}

var words={};
var keys=[];

fs.readFile(filename, 'utf8', analyze);

function analyze(err, data){
	if(err){
		throw err;
	}
	console.log("analyzing "+filename+" .....");
	var tokens = data.split(/\W+/);   // split at any non-letter non-number char
	for (var i = 0; i < tokens.length; i++){
		if(words[tokens[i]]==undefined){
			words[tokens[i]]=1;
			keys.push(tokens[i]);
		}
		else{
			words[tokens[i]]++;
		}
	}


	console.log("sorting......");
	// sort on concordance
	keys.sort(function(a, b){
		return words[a] - words[b];
	});

	console.log("<----- all the words ----->");
	for(var i = 0; i < keys.length; i++){
		console.log(keys[i]+": "+words[keys[i]]);
	}

}

/* old stuff from 2015 03 04 ******************
var names = ['skippy', 'zippy', 'hello', 'another', 'is', 'hello'];

var test = ['what', 'is', 'hello'];

console.log('inputting test words....');
var counts={}; // an associative array with counts of test
for(var i = 0; i < test.length; i++){
	counts[test[i]]=0;
	console.log(test[i]+": "+counts[test[i]]);
}


// loop through names and test and add up occurences of text in names
console.log('testing for concordance....');
for (var i = 0; i < test.length; i++){
	for (var j = 0; j < names.length; j++){
		if(test[i] == names[j]){
			// increment counter
			counts[test[i]]++;
		}
	}
}

for(var i = 0; i < test.length; i++){
	console.log(test[i]+": "+counts[test[i]]);
}
****************************/
