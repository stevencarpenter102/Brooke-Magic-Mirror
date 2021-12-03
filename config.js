/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/getting-started/configuration.html#general
 * and https://docs.magicmirror.builders/modules/configuration.html
 */
let config = {
	address: "localhost", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "imperial",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "alert"
		},
		{
			module: "clock",
			position: "top_left",
			config: {
				timeFormat: "12",
				timezone: "America/New_York",
				displaySeconds: false,
				showPeriodUpper: true,
			}
		},
		{
			module: "calendar",
			header: "US Holidays",
			position: "top_left",
			config: {
				calendars: [
					{
						symbol: "calendar-check",
						url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics"
					}
				]
			}
		},
		{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "Towson, MD",
				locationID: "4371582", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "33fa524089399f0705c311479725ca52",
				units: "imperial",
				tempUnits: "imperial",
				windUnits: "imperial",
				roundTemp: true,
				degreeLabel: true,

			}
		},
		{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "openweathermap",
				type: "forecast",
				location: "Towson, MD",
				locationID: "4371582", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "33fa524089399f0705c311479725ca52",
				units: "imperial",
				tempUnits: "imperial",
				windUnits: "imperial",
				roundTemp: true,
				degreeLabel: true,

			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config:
			{
				feeds: [
					{
						title: "New York Times",
						url: "https://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					},
					{
						title: "BBC",
						url: "https://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml"
					}
				],
				animationSpeed: 5000
			}
		},
		{

		    module: "MMM-News-QR",
		    position: "middle_center",
		    config: {
			// possible values (polling, push)
			// push only works with MagicMirror 2.8+ and broadcastNewsFeeds activated
			updateType : "push",	// Interval to check the news
			// interval: 2000,  	// only needed if updateType is polling
			animationSpeed: 2500,	// Animation between change
			colorDark: "#fff",	// Color of the Code
			colorLight: "#000",	// Background Color
			imageSize: 150  	// Size of the Code
		    }
		},
		{
			module: 'MMM-DailyBibleVerse',
			position: 'bottom_bar',
			config:{
				version: 'NIV'
			}
		},
		{
			  module: "MMM-GroveGestures",
			  position: "top_right",
			  config: {
			    autoStart: true, //When Mirror starts, recognition will start.
			    verbose:false, // If set as `true`, useful messages will be logged.
			    recognitionTimeout: 1000, //Gesture sequence will be ended after this time from last recognized gesture.
			    cancelGesture: "WAVE", //If set, You can cancel gesture sequence with this gesture.
			    visible: true, //Recognized gesture sequence will be displayed on position

			    idleTimer: 1000*60*30, // `0` for disable, After this time from last gesture, onIdle will be executed.
			    onIdle: { // See command section
			      moduleExec: {
				module: [],
				exec: (module, gestures) => {
				  module.hide(1000, null, {lockstring:"GESTURE"})
				}
			      }
			    },
			    onDetected: {
			      notificationExec: {
				notification: "GESTURE_DETECTED",
			      },
			      /* You can make Mirror to wake up the modules which were hidden by onIdle with any gestures.
			      moduleExec: {
				module: [],
				exec: (module) => {
				  module.show(1000, null, {lockstring:"GESTURE"})
				}
			      }
			      */
			    },

			    gestureMapFromTo: { //When your sensor is installed with rotated direction, you can calibrate with this.
			      "Up": "UP",
			      "Down": "DOWN",
			      "Left": "LEFT",
			      "Right": "RIGHT",
			      "Forward": "FORWARD",
			      "Backward": "BACKWARD",
			      "Clockwise": "CLOCKWISE",
			      "anti-clockwise": "ANTICLOCKWISE",
			      "wave": "WAVE"
			    },

			    defaultNotification: "GESTURE",
			    pythonPath: "/usr/bin/python", // your python path

			    defaultCommandSet: "default",
			    commandSet: {
			      "default": {
//				"FORWARD-BACKWARD": {
//				  notificationExec: {
//				    notification: "ASSISTANT_ACTIVATE",
//				    payload: null
//				  }
//				},
//				"LEFT-RIGHT": {
//		  		    notificationExec: {
//				    notification: "ASSISTANT_CLEAR",
//				    payload:null,
//				  }
//				},
//				"CLOCKWISE": {
//				  moduleExec: {
//				    module: [],
//				    exec: (module, gestures) => {
//				      module.hide(1000, null, {lockstring:"GESTURE"})
//				    }
//				  }
//				},
//				"ANTICLOCKWISE": {
//				  moduleExec: {
//				    module: [],
//				    exec: (module, gestures) => {
//				      module.show(1000, null, {lockstring:"GESTURE"})
//				    }
//				  }
//				},
				"LEFT": {
				  notificationExec: {
				    notification: "ARTICLE_PREVIOUS",
				    payload: null,
				  }
				},
				"RIGHT": {
				  notificationExec: {
				    notification: "ARTICLE_NEXT",
	
				  }
				},
			      },
			    },
			  }
			}
		]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
