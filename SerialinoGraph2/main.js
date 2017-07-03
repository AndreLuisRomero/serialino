// Serialino Graph 2
// Console serial for Arduino
// ver 1.0

// MIT License
// Copyright (c) 2017 Andre Luis Romero
// andreluisromero@gmail.com.br 


// Constants and Variables
const serial = chrome.serial;
var is_on = false;
var commp = "";
var DEVICE_PATH = "";
var connection = "";

var datum1 = new Array();
var datum2 = new Array();
var datum3 = new Array();
var datum4 = new Array();

/* Interprets an ArrayBuffer as UTF-8 encoded string data. */
var ab2str = function(buf) {
  var bufView = new Uint8Array(buf);
  var encodedString = String.fromCharCode.apply(null, bufView);
  return decodeURIComponent(escape(encodedString));
};

/* Converts a string to UTF-8 encoding in a Uint8Array; returns the array buffer. */
var str2ab = function(str) {
  var encodedString = unescape(encodeURIComponent(str));
  var bytes = new Uint8Array(encodedString.length);
  for (var i = 0; i < encodedString.length; ++i) {
    bytes[i] = encodedString.charCodeAt(i);
  }
  return bytes.buffer;
};

//---------------------------------------------
var SerialConnection = function() {
  this.connectionId = -1;
  this.lineBuffer = "";
  this.boundOnReceive = this.onReceive.bind(this);
  this.boundOnReceiveError = this.onReceiveError.bind(this);
  this.onConnect = new chrome.Event();
  this.onReadLine = new chrome.Event();
  this.onError = new chrome.Event();
};

SerialConnection.prototype.onConnectComplete = function(connectionInfo) {
  if (!connectionInfo) {
    $('#statusCircle').css('fill','red');
    log("Connection failed.");
    return;
  }
  this.connectionId = connectionInfo.connectionId;
  chrome.serial.onReceive.addListener(this.boundOnReceive);
  chrome.serial.onReceiveError.addListener(this.boundOnReceiveError);
  this.onConnect.dispatch();
};

SerialConnection.prototype.onReceive = function(receiveInfo) {
  if (receiveInfo.connectionId !== this.connectionId) {
    return;
  }

  this.lineBuffer += ab2str(receiveInfo.data);

  var index;
  while ((index = this.lineBuffer.indexOf('\n')) >= 0) {
    var line = this.lineBuffer.substr(0, index + 1);
    this.onReadLine.dispatch(line);
    this.lineBuffer = this.lineBuffer.substr(index + 1);
  }

};

SerialConnection.prototype.onReceiveError = function(errorInfo) {
  if (errorInfo.connectionId === this.connectionId) {
    this.onError.dispatch(errorInfo.error);
  }
};

SerialConnection.prototype.connect = function(path) {
  serial.connect(path, this.onConnectComplete.bind(this))
};

SerialConnection.prototype.send = function(msg) {
  if (this.connectionId < 0) {
    throw 'Invalid connection';
  }
  serial.send(this.connectionId, str2ab(msg), function() {});
};

SerialConnection.prototype.disconnect = function() {
  if (this.connectionId < 0) {
    throw 'Invalid connection';
  }
  serial.disconnect(this.connectionId, function() {});
};
//---------------------------------------------
function txtJSON(jsontxt) {

  // ---------------------------------------------------
  sensor1 = jQuery.parseJSON( jsontxt ).sensor1 ;

  datum1.push(sensor1);
  if (datum1.length > 100) {
      // datum = []; // clear array
      datum1.shift();
  }

  var strdatum1 = '';
      for(var i in datum1)
      {
             var strdatum1 = strdatum1 + ((i*9)+90) + ',' + map(datum1[i],0,5,550,10) + '\n';
      }

  fontsize1 = jQuery.parseJSON( jsontxt ).fontsize1 ;
  type1 = jQuery.parseJSON( jsontxt ).type1 ;
  color1 = jQuery.parseJSON( jsontxt ).color1 ;
  // ---------------------------------------------------
  sensor2 = jQuery.parseJSON( jsontxt ).sensor2 ;

  datum2.push(sensor2);
  if (datum2.length > 100) {
      // datum = []; // clear array
      datum2.shift();
  }

  var strdatum2 = '';
      for(var i in datum2)
      {
             var strdatum2 = strdatum2 + ((i*9)+90) + ',' + map(datum2[i],0,5,550,10) + '\n';
      }

  fontsize2 = jQuery.parseJSON( jsontxt ).fontsize2 ;
  type2 = jQuery.parseJSON( jsontxt ).type2 ;
  color2 = jQuery.parseJSON( jsontxt ).color2 ;
  // ---------------------------------------------------
  sensor3 = jQuery.parseJSON( jsontxt ).sensor3 ;
  
  datum3.push(sensor3);
  if (datum3.length > 100) {
      // datum = []; // clear array
      datum3.shift();
  }

  var strdatum3 = '';
      for(var i in datum3)
      {
             var strdatum3 = strdatum3 + ((i*9)+90) + ',' + map(datum3[i],0,5,550,10) + '\n';
      }

  fontsize3 = jQuery.parseJSON( jsontxt ).fontsize3 ;
  type3 = jQuery.parseJSON( jsontxt ).type3 ;
  color3 = jQuery.parseJSON( jsontxt ).color3 ;
  // ---------------------------------------------------
  sensor4 = jQuery.parseJSON( jsontxt ).sensor4 ;

  datum4.push(sensor4);
  if (datum4.length > 100) {
      // datum = []; // clear array
      datum4.shift();
  }

  var strdatum4 = '';
      for(var i in datum4)
      {
             var strdatum4 = strdatum4 + ((i*9)+90) + ',' + map(datum4[i],0,5,550,10) + '\n';
      }

  fontsize4 = jQuery.parseJSON( jsontxt ).fontsize4 ;
  type4 = jQuery.parseJSON( jsontxt ).type4 ;
  color4 = jQuery.parseJSON( jsontxt ).color4 ;
  // ---------------------------------------------------

      var sen1str1 = '<svg version="1.2" xmlns="http://www.w3.org/2000/svg"'+
		 'xmlns:xlink="http://www.w3.org/1999/xlink" class="graph" aria-labelledby="title" role="img">'+
		  '<title id="title">A line chart showing some information</title>'+
		'<g class="grid x-grid" id="xGrid">'+
		 ' <line x1="90" x2="90" y1="0" y2="550"></line>'+
		'</g>'+
		'<g class="grid y-grid" id="yGrid">'+
		 ' <line x1="90" x2="1000" y1="550" y2="550"></line>'+
		'</g>'+
		  '<g class="labels x-labels">'+
		  '<text x="90" y="570">0</text>'+
		  '<text x="180" y="570">10</text>'+
		  '<text x="270" y="570">20</text>'+
		  '<text x="360" y="570">30</text>'+
		  '<text x="450" y="570">40</text>'+
		  '<text x="540" y="570">50</text>'+
		  '<text x="630" y="570">60</text>'+
		  '<text x="720" y="570">70</text>'+
		  '<text x="810" y="570">80</text>'+
		  '<text x="900" y="570">90</text>'+
		  '<text x="990" y="570">100</text>'+
		  '<text x="540" y="590" class="label-title">pixel</text>'+
		'</g>'+
		'<g class="labels y-labels">'+
		'  <text x="80" y="15">5</text>'+
		'  <text x="80" y="122">4</text>'+
		'  <text x="80" y="229">3</text>'+
		'  <text x="80" y="336">2</text>'+
		'  <text x="80" y="443">1</text>'+
		'  <text x="80" y="550">0</text>'+
		'  <text x="50" y="300" class="label-title">volts</text>'+
		'</g>'+

		'<svg width="1000" height="600" viewBox="0 0 1000 600" >'+
		  
		 ' <polyline'+
		 '    fill="none"'+
		 '    stroke="#';
	var sen1aftcolor = '"'+
		 '    stroke-width="2"'+
		 '    points="';

    var sen1str3 = '  "'+
					'/>'+
					'</svg>';
	
	var sen1str4 = '</svg>';

    var sen1res = sen1str1.concat(color1,sen1aftcolor,strdatum1,sen1str3,sen1str4);
    
    if (sensor2 !== null && sensor2 !== undefined)
    {
    	var sen1res = sen1str1.concat(color1,sen1aftcolor,strdatum1,sen1str3,sen1str1,color2,sen1aftcolor,strdatum2,sen1str3,sen1str4);
    }

    if (sensor3 !== null && sensor3 !== undefined)
    {
    	var sen1res = sen1str1.concat(color1,sen1aftcolor,strdatum1,sen1str3,sen1str1,color2,sen1aftcolor,strdatum2,sen1str3,sen1str1,color3,sen1aftcolor,strdatum3,sen1str3,sen1str4);
    }

    if (sensor4 !== null && sensor4 !== undefined)
    { 
    	var sen1res = sen1str1.concat(color1,sen1aftcolor,strdatum1,sen1str3,sen1str1,color2,sen1aftcolor,strdatum2,sen1str3,sen1str1,color3,sen1aftcolor,strdatum3,sen1str3,sen1str1,color4,sen1aftcolor,strdatum4,sen1str3,sen1str4);
    }

    // ---------------------------------------------------
    // Print Graphs to HTML buffer area
    $('#graph').html(sen1res);
  
  // ---------------------------------------------------  
      
}
//---------------------------------------------
function log(msg) {
  $('#msgconsole').html(msg + '<br/>');
}
//---------------------------------------------
function map( x,  in_min,  in_max,  out_min,  out_max){
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
//---------------------------------------------
document.getElementById("button").onclick = function(){

  commp = document.getElementById("commport").value;

  DEVICE_PATH = "COM" + commp;

  connection = new SerialConnection();

  connection.onConnect.addListener(function() {
    log('  connected to: ' + DEVICE_PATH);
    connection.send("connection OK");
    $('#statusCircle').css('fill','#00FF00');
  });

  connection.onReadLine.addListener(function(line) {
    txtJSON(line);
  });

  connection.connect(DEVICE_PATH)

}
//---------------------------------------------


