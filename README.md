[![CircleCI](https://circleci.com/gh/tarimshahab/trident.svg?&style=shield&circle-token=82113293681622bc5fde572c119187dd71be2771)](https://circleci.com/gh/tarimshahab/trident)

# trident
Capstone - Mobile COOP Nav uOttawa

We use React Native framework to create the COOP Nav Mobile App, with Node JS as the backend.

## Download Node JS and npm

You can download Node from its [website](https://nodejs.org/en/download/). Get the one for your OS.
You'll need to have Node v6 or later on your machine.

Also install npm. You need npm v3 or v4. Don't use npm v5, as there is a bug with it and React Native.

## Clone Repo

Clone the trident repo locally, if you haven't already.

In the project root folder run:

`npm install`

to install all dependencies.

## Set up React Native
Once you have npm, install the command line app: Create React Native App.

`npm install -g create-react-native-app`

Note: React projects can be made with `react-native-cli`, or `create-react-native-app`. We use the latter as it makes it much easier to test on actual devices without setting up individual projects for Android and iOS.

## Testing On Mobile Device

Download the Expo app on your phone.

Make sure your laptop and phone is connected to the same wireless network.

In the top directory of your local repo, run

`npm start`

The command should print a QR code in your terminal. Use the Expo app to scan the QR code on your phone.
Expo should open your app on your phone.

**Common Troubleshooting:** The QR code might encode the wrong IP address. If you are on wifi then run the following code in command line:

`ipconfig`

Look at the `Wireless LAN adapter Wi-Fi:` section of what prints out. Then on Expo, instead of scanning QR code, manually enter the `exp://<IPv4 Address>:19000` to open your app.

Shake your phone to open the debug menu on the phone. Disable 'Live Reloading' and enable 'Hot Reloading'. Hot reloading allows changes you make in your code on your computer to be updated live on the phone.

The terminal should output a log (including errors) as the app is running.
