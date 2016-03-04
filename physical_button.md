# spacebrewww
there is no spoon

// how to connect arcade button to spacebrew \\

CIRCUIT: http://pancake.wtf/wp-content/uploads/2016/03/Screen-Shot-2016-03-04-at-5.52.57-PM.png

ARDUINO CODE:

const int buttonPin = 2;
int buttonState = 0;

void setup() {
  
  Serial.begin(9600);
pinMode(buttonPin, INPUT);

}

void loop() {

buttonState = digitalRead(buttonPin);
Serial.println(buttonState);

}

PROCESSING SKETCH:

import spacebrew.*;
import processing.serial.*;

String server = "sandbox.spacebrew.cc";
String name = "buttonValue";
String description = "this button does things";

int serialValue = 0;

Spacebrew sb;
Serial myPort;

void setup() {
  size(800, 600);

  sb = new Spacebrew(this);
  sb.addPublish("buttonChanger", "boolean", false);
  sb.connect(server, name, description);

  println(Serial.list());
  myPort = new Serial(this, Serial.list()[1], 9600); 
  myPort.bufferUntil('\n');
}

void draw() {

  background(0);
  textAlign(CENTER);
  textSize(16);

  if (sb.connected()) {
    text("Connected as: " + name, width/2, 25 );  
    textSize(60);
    text(serialValue, width/2, height/2 + 20);
  } else {
    text("Not Connected to Spacebrew", width/2, 25 );
  }
}

int lastValue = -1;

void serialEvent (Serial myPort) {
  String inString = myPort.readStringUntil('\n');

  if (inString != null) {
    inString = trim(inString);

    serialValue = int(inString); 

    if (sb.connected() && serialValue != lastValue) {
      sb.send("buttonChanger", serialValue);
    }
    lastValue = serialValue;
  }
}

