/* global Module */

/* Magic Mirror
 * Module: MMM-RNV
 *
 * By Stefan Krause http://yawns.de
 * MIT Licensed.
 */

Module.register('brewview', {

	defaults: {
		animationSpeed: 1000,
		refreshInterval: 1000 * 30, //refresh every minute
		updateInterval: 1000 * 30, //update every 30 seconds
		timeFormat: config.timeFormat,
		lang: config.language,
		initialLoadDelay: 0, // 0 seconds delay
		retryDelay: 2500,
		brewUrl: 'http://192.168.1.22:8090',

		iconTable: {
			"TEMP": "fas fa-temperature-high"
		},
	},

	// Define required scripts.
	getScripts: function () {
		return ["moment.js", "font-awesome.css"];
	},

	getStyles: function () {
		return ['MMM-RNV.css'];
	},

	start: function () {
		Log.info('Starting module: ' + this.name);
		this.loaded = false;
		this.sendSocketNotification('CONFIG', this.config);
	},

	getDom: function () {
		var wrapper = document.createElement("div");

		if (!this.loaded) {
			wrapper.innerHTML = this.translate('LOADING');
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if (!this.brewData.beerTemp) {
			wrapper.innerHTML = "No data";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		var table = document.createElement("table");
		table.id = "rnvtable";
		table.className = "small thin light";
		wrapper.innerHTML = '<i class="fas fa-temperature-high"></i> ' + this.brewData.beerTemp + '</br><i class="fas fa-arrow-right"></i> ' + this.brewData.setPoint + '</br><i class="fas fa-plug"></i> ' + this.brewData.state + '</br><i class="far fa-clock"></i> ' + this.currentTime();

		if (this.ticker) {
			var marqueeTicker = document.createElement("marquee");
			marqueeTicker.innerHTML = this.ticker;
			marqueeTicker.className = "small thin light";
			marqueeTicker.width = document.getElementsByClassName("module MMM-RNV MMM-RNV")[0].offsetWidth;
			wrapper.appendChild(marqueeTicker);
		}

		return wrapper;
	},

	currentTime: function () {
		// For the time now
		Date.prototype.timeNow = function () {
			return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
		}
		var newDate = new Date();
		return newDate.timeNow();
	},

	processBrewData: function (data) {
		if (!data.beerTemp) {
			return;
		}

		this.brewData = data;

		return;
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "STARTED") {
			this.updateDom();
		} else if (notification === "DATA") {
			this.loaded = true;
			this.processBrewData(JSON.parse(payload));
			this.updateDom();
		}
	}

});