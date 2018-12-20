# RoutesApp

This is a simple application that helps you manage routes using maps and was done using React Native and the React Native Maps package that is available in this [repository](https://github.com/react-community/react-native-maps).

 React Native 0.57.8
 
 React Native Maps 0.22.1

### Installation

This application needs [Node.js](https://nodejs.org/) installed together with [NPM](https://www.npmjs.com/get-npm) so you will be able to install [ react-native-cli](https://www.npmjs.com/package/react-native-cli) so you can execute the commands below

In addition, it will be necessary for you to have all the necessary environment for running native Android or IOS code or those two platforms

If you need help setting up your environment just follow the [instructions](https://rocketseat.com.br/assets/files/development-environment-rn.pdf) of this tutorial

First use the `` git clone`` after this

```
$ cd RoutesApp

$ npm install i 

// Or you can use Yarn

$ yarn install

// Command to run the application

$ react-native run-android

// Or it can be on iOS devices

$ react-native run-ios
```
Make sure that the `` AndroidManifest.xml`` have this with your Maps API Key in this location

```
<meta-data 
        android:name="com.google.android.geo.API_KEY"
        android:value="Put your API Key here"/>
```
