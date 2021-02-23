# MMM-brew-data

This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror).

Display data from fermentation

## Installation
Open a terminal session, navigate to your MagicMirror's `modules` folder and execute `git clone https://github.com/fxwalsh/MMM-brew-data.git`.

Activate the module by adding it to the config.js file as shown below.

## Using the module
````javascript
modules: [
		{
		module: "brewview",
		header: "Brewing Data",
		position: "top_right",
		config:{
			brewUrl: "http://192.168.1.22:8090" // change to API endpoint for data
		},
````
