/**
 * Spacebrew Boilerplate
 *
 * A VERY minimal template for the Spacebrew app of your dreams.
 */

/* Main Spacebrew object */
var sb;

/**
 * The name of your app. Change this!
 * @type {String}
 */
var appName = "MyCoolApp";

/**
 * Often times, you want to randomize your name.
 * Change this to 'false' if not–or just delete
 * the code in setupSpacebrew();
 * @type {Boolean}
 */
var doRandomName = true;

/**
 * Set up spacebrew & do other stuff 
 * when the window is ready.
 */
window.onload = function () {
	setupSpacebrew();
	setupUI();

document.body.onmousemove = function(e) {
	sb.send("mouse", "range", String( e.clientX));
}

}

/**
 * Setup Spacebrew object & range catcher
 */
function setupSpacebrew(){

	if ( doRandomName ){
		// randomize name
		var random_id = "0000" + Math.floor(Math.random() * 10000);
		appName = appName + ' ' + random_id.substring(random_id.length-4);
	}

	// setup spacebrew connection
	sb = new Spacebrew.Client();
	sb.name(appName);

	// add publishers and subscribers
	sb.addPublish("mouse", "range");
	sb.addSubscribe("background", "range");

	// setup listeners
	sb.onBooleanMessage = onBooleanMessage;
	sb.onStringMessage = onStringMessage;
	sb.onRangeMessage = onRangeMessage;
	sb.onCustomMessage = onCustomMessage;
	sb.connect();
}

/**
 * @param  {String} name 
 * @param  {Boolean} value
 */
function onBooleanMessage( name, value ){
	// do some stuff!
	console.log("Boolean: "+name+":"+value);
}

/**
 * @param  {String} name 
 * @param  {String} value
 */
function onStringMessage( name, value ){
	// do some stuff!
	console.log("String: "+name+":"+value);
}

/**
 * @param  {String} name 
 * @param  {Number} value
 */
function onRangeMessage( name, value ){
	if( name == "background"){
		document.body.style.backgroundColor = "rgb(" + value + "," + value + "," + value + ")";
	}
}

/**
 * @param  {String} name 
 * @param  {String} value
 */
function onCustomMessage( name, value ){
	// do some stuff!
	console.log("Custom: "+name+":"+value);
}

/**
 * Setup some stuff in the DOM. 
 * You can delete this, if you want.
 */
function setupUI(){
	// set "name" div
	var about = document.getElementById("appname");
	about.innerHTML = appName;
}