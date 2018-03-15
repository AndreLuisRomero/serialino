// Serialino
// Console serial for Arduino
// ver 1.0

// MIT License
// Copyright (c) 2017 Andre Luis Romero
// andreluisromero@gmail.com.br 

  // sensor variables
  int sensorValue1 = 0;
  int sensorValue2 = 0;
  int sensorValue3 = 0;
  int sensorValue4 = 0;

  float volts1 = 0;
  float volts2 = 0;
  float volts3 = 0;
  float volts4 = 0;

void setup() {
  Serial.begin(9600);
}
  
void loop() {

  // Read analog A/D
  sensorValue1 = analogRead(A0);
  sensorValue2 = analogRead(A1);
  sensorValue3 = analogRead(A2);
  sensorValue4 = analogRead(A3);
  
  printValues();

  delay(250);
  
}

// Send the Led status via serial in JSON format
void printValues() {
   
    volts1 = sensorValue1 * (5.0 / 1023.0);
    volts2 = sensorValue2 * (5.0 / 1023.0);
    volts3 = sensorValue3 * (5.0 / 1023.0);
    volts4 = sensorValue4 * (5.0 / 1023.0);

    // Example Json sensor1 
    // {"sensor1": 2.414,"fontsize1": 150,"type1": "volts","color1": "FF0000"}
    
    String header = "{";
    
    String json1 = "\"sensor1\": " + String(volts1,3) + ",\"fontsize1\": " + "150" + ",\"type1\": " + "\"volts\"" + ",\"color1\": " + "\"FF0000\"";
    String json2 = "\"sensor2\": " + String(volts2,3) + ",\"fontsize2\": " + "100" + ",\"type2\": " + "\"volts\"" + ",\"color2\": " + "\"0000FF\"";
    String json3 = "\"sensor3\": " + String(volts3,3) + ",\"fontsize3\": " + "50" + ",\"type3\": " + "\"volts\"" + ",\"color3\": " + "\"00AA00\"";
    String json4 = "\"sensor4\": " + String(volts4,3) + ",\"fontsize4\": " + "25" + ",\"type4\": " + "\"volts\"" + ",\"color4\": " + "\"00FFFF\"";
    
    String footer = "}";

    // Select number of channels
    // Serial.println(header+json1+footer); // sensor 1

    Serial.println(header+json1+","+json2+footer); // sensor 1 2

    // Serial.println(header+json1+","+json2+","+json3+footer); // sensor 1 2 3

    // Serial.println(header+json1+","+json2+","+json3+","+json4+footer); // sensor 1 2 3 4
}


