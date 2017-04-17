// Serialino
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

  sensor1 = jQuery.parseJSON( jsontxt ).sensor1 ;
  fontsize1 = jQuery.parseJSON( jsontxt ).fontsize1 ;
  type1 = jQuery.parseJSON( jsontxt ).type1 ;
  color1 = jQuery.parseJSON( jsontxt ).color1 ;

  sensor2 = jQuery.parseJSON( jsontxt ).sensor2 ;
  fontsize2 = jQuery.parseJSON( jsontxt ).fontsize2 ;
  type2 = jQuery.parseJSON( jsontxt ).type2 ;
  color2 = jQuery.parseJSON( jsontxt ).color2 ;

  sensor3 = jQuery.parseJSON( jsontxt ).sensor3 ;
  fontsize3 = jQuery.parseJSON( jsontxt ).fontsize3 ;
  type3 = jQuery.parseJSON( jsontxt ).type3 ;
  color3 = jQuery.parseJSON( jsontxt ).color3 ;

  sensor4 = jQuery.parseJSON( jsontxt ).sensor4 ;
  fontsize4 = jQuery.parseJSON( jsontxt ).fontsize4 ;
  type4 = jQuery.parseJSON( jsontxt ).type4 ;
  color4 = jQuery.parseJSON( jsontxt ).color4 ;

      // Print led Status to HTML buffer area
      $('#buffer1').css('font-size',fontsize1);
      $('#buffer1').css('color',color1);
      $('#buffer1').html(sensor1 + ' ' + type1 + '<br/>' );

  if (sensor2 !== null && sensor2 !== undefined)
    {
      // Print led Status to HTML buffer area
      $('#buffer2').css('font-size',fontsize2);
      $('#buffer2').css('color',color2);
      $('#buffer2').html(sensor2 + ' ' + type2 + '<br/>' );
    }

   if (sensor3 !== null && sensor3 !== undefined)
    {
      // Print led Status to HTML buffer area
      $('#buffer3').css('font-size',fontsize3);
      $('#buffer3').css('color',color3);
      $('#buffer3').html(sensor3 + ' ' + type3 + '<br/>' );
    } 

    if (sensor4 !== null && sensor4 !== undefined)
    {
      // Print led Status to HTML buffer area
      $('#buffer4').css('font-size',fontsize4);
      $('#buffer4').css('color',color4);
      $('#buffer4').html(sensor4 + ' ' + type4 + '<br/>' );
    }

}
//---------------------------------------------
function log(msg) {
  $('#msgconsole').html(msg + '<br/>');
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


