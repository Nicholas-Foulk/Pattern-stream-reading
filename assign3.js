#!/usr/bin/env node

var fs = require("fs");
var stream = require('stream')
var Transform = require('stream').Transform;
var util	= require(	"util" ).inherits;
var liner = new stream.Transform( { objectMode: true } )

if (!Transform) {
 Transform = require('readable-stream/transform');
}

function PatternMatch(pattern){
	 if (!(this instanceof PatternMatch)) {
        return( new PatternMatch(pattern));
    }
	Transform.call(
	this,
	{
		objectMode: true
	}
	);
	 if ( ! ( pattern instanceof RegExp ) ) {

        pattern = new RegExp( pattern, "g" );

    }
	this._pattern = this._clonePattern( pattern );
	this._inputBuffer = "";
	
}
inherits(PatternMatch, Transform);
PatternMatch.prototype._clonePattern = function( pattern ) {

    // Split the pattern into the pattern and the flags.
    var parts = pattern.toString().slice( 1 ).split( "/" );
    var regex = parts[ 0 ];
    var flags = ( parts[ 1 ] || "g" );

    // Make sure the pattern uses the global flag so our exec() will run as expected.
    if ( flags.indexOf( "g" ) === -1 ) {

        flags += "g";

    }

    return( new RegExp( regex, flags ) );

};
liner._transform = function (chunk, encoding, done) {
	
     var data = chunk.toString()
     //if (this._lastLineData) data = this._lastLineData + data
	 //var result = string.
     var lines = data.split("\n")
     this._lastLineData = lines.splice(lines.length-1,1)[0]
 
     lines.forEach(this.push.bind(this))
     done()
}
 
liner._flush = function (done) {
     if (this._lastLineData) this.push(this._lastLineData)
     this._lastLineData = null
	 //console.log("we are done flushing.\n");
     done()
}


console.log("A startup is a business built to grow rapidly.\n");
module.exports = liner
