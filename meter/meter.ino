#include "ThingSpeak.h"
#include<PZEM004Tv30.h>
#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>
PZEM004Tv30 pzem(D5, D6); //------Tx-D5---Rx-D6---//
//------- WI-FI details ----------//
char ssid[] = "Unity";
char pass[] = "123456789";
//--------Thingspeak details -------//
unsigned long Channel_ID = 2231908; //Channel ID
const char * myWriteAPIKey = "ZSZG2UQH3LA9UMCC";
String value = "";
//---------------PZEM-Variables-------------//
float Power;
float instantaneousEnergy;
float HourEnergy;
float TotalEnergy;
float TimeInterval = 1;
float Hour = 0;
float Units = 0;
WiFiClient  client;

int count = 0;

void internet()
{
  if (WiFi.status() != WL_CONNECTED)
  {
    while (WiFi.status() != WL_CONNECTED)
    {
      WiFi.begin(ssid, pass);
      delay(5000);
    }
  }
}

void setup()
{

  digitalWrite(LED_BUILTIN, LOW);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  ThingSpeak.begin(client);
  internet();
  digitalWrite(LED_BUILTIN, HIGH);
}


void loop()
{
  digitalWrite(LED_BUILTIN, LOW);   // Turn the LED on (Note that LOW is the voltage level
  internet();
  Power = pzem.power();
  if ( !isnan(Power) )
  {
    count++;
    instantaneousEnergy = Power * TimeInterval;
    TotalEnergy += instantaneousEnergy;
    ThingSpeak.writeField(Channel_ID, 1, Power, myWriteAPIKey);
    ThingSpeak.writeField(Channel_ID, 2, instantaneousEnergy, myWriteAPIKey);
    ThingSpeak.writeField(Channel_ID, 3, TotalEnergy, myWriteAPIKey);
    HourEnergy += instantaneousEnergy;
  }
  if (count == 3600) {
    Hour++;
    ThingSpeak.writeField(Channel_ID, 4, HourEnergy, myWriteAPIKey);
    HourEnergy = 0;
    count = 0;
  }
  if (Hour == 24) {
    Bill(TotalEnergy);
  }
}

void Bill(float TotalEnergy) {
  Units = TotalEnergy / 1000;
  ThingSpeak.writeField(Channel_ID, 5, Units, myWriteAPIKey);
}
//python -m esptool --chip esp8266 erase_flash
