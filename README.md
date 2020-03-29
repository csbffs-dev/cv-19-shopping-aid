# CV-19 Shopping Aid Ionic App

## Installing Dependencies
```bash
cd cv-19-shopping-aid
npm install
```
In order to run this app in iOS native mode, cocoapods needs to be installed prior to running the app in Xcode
```bash
gem install cocoapods
```

## Running
```bash
ionic serve
```
The above command should open the app on your default browser [here](http://localhost:8100).

To run this ionic app on mobile device emulator of choice.  

Note: iOS app requires XCode and android requires Android SDK.
```bash
ionic capacitor run [platform]
```

## Building
```bash
ionic build
```