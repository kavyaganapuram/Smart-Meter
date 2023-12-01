Smart Meter

Project Insight

Empowering users with control over electricity consumption, the Smart Meter Assistant is a techno-savvy solution combining hardware finesse and software intelligence. Designed around the ESP8266 microcontroller and Angular web application, this project not only monitors your power usage but also nudges you towards efficient energy habits. Let's delve into the world where electricity bills make sense, and every unit saved is a triumph.

Core Objectives

Transparent Billing: Decode your electricity bills with precise readings, including voltage, current, instantaneous power, and total power.

Usage Awareness: Get real-time insights into today's power consumption in units and the corresponding bill in rupees.

Budget Management: Set monthly budgets, receive day-to-day limits, and get notified if you're straying beyond the budgetary boundaries.

Research Groundwork

In the labyrinth of electricity tariffs, we uncovered a fascinating truth. Minor fluctuations in consumed units can lead to disproportionately higher bills. For instance, consuming 100 units may cost you 252 rupees, but that 101st unit could spike it to 344 rupees. Our mission is to empower users to save these units and reap the benefits.

Software and Hardware Requirements
Hardware
Smart Meter Components:
PZEM004T (Power Monitoring Sensor)
ESP8266 (Microcontroller with Integrated WiFi Module)

Software

Database and Server:
Firebase

Web Application:
Angular

Programming Languages:
JavaScript/TypeScript
Embedded Programming (C++)

Hardware Connections

The PZEM004T is the brains behind the operation, linked to the ESP8266 through serial communication.

Implementation Steps

Arduino Setup:

Flash the Arduino code onto the ESP8266 for seamless communication with the PZEM004T sensor and efficient data transfer to the database.
Angular Application:

Develop an Angular application to calculate readings, display them, and provide a user-friendly web interface.
Server Setup:

Set up a server to send notifications to users about their usage patterns.

Installation Guide

Prerequisites

Arduino IDE with Packages (PZEM004T, ESP8266 Generic Module)
Angular
NodeJs
NPM Manager

Installation Steps

Download the project repository as a zip folder.
Extract the contents to your chosen location.
Arduino Setup
Install the necessary packages in the Arduino IDE for PZEM004T and ESP8266.
Load the Arduino code onto the ESP8266 for efficient communication and data transfer.

Angular Setup
Create a new Angular project:
ng new your-project-name

Copy the extracted src/app/components and src/app/services folders into the corresponding directories of your Angular project.

Server Configuration
Create a new folder named server in your project directory.
Copy the server.js file from the extracted src/server folder into the newly created server folder.
Running the Application
In the terminal, navigate to your Angular project directory:


cd your-project-name
Start the Angular application:


ng serve
Open a new terminal and navigate to the server folder:

cd your-project-name/server

Start the server:

node server.js
Open your web browser and go to http://localhost:4200 to explore the Smart Meter Assistant.

User Guide

Monitor Consumption:

Log in and head to the dashboard to observe today's electricity consumption in units and the corresponding bill in rupees.

Set Limits:
Define a monthly budget for electricity consumption. The application will calculate day-to-day limits and notify you if exceeded.

Manage Bills:
View and manage your current bill through the web application interface.

Open for Collaboration
Contributions to enhance the Smart Meter Assistant are not just welcome but eagerly awaited. If you have ideas for additional features or improvements, fork the repository, make your magic happen, and submit a pull request. Let's make the Smart Meter Assistant an even smarter and more user-friendly tool together!

May your units be saved, and your bills be wise! ⚡🌐
