//Imports
import { app, BrowserWindow } from "electron";

//Setup the Main Class
export class Electron_Client {
	//
	//Setup the Public Properties
	Requested_URL: string;
	Main_Window: Electron.BrowserWindow | null;
	App: Electron.App;

	//Setup the Constructor
	constructor(Requested_URL: string) {
		//
		//Update the Public Properties
		this.Requested_URL = Requested_URL;
		this.Main_Window = null;
		this.App = app;

		//Listen for Events on the Electron Client
		this.App.on("window-all-closed", this.#App_Closed_Handler.bind(this));
		this.App.on("ready", this.#Ready_Handler.bind(this));
	}

	//Handles the event of app fully closed
	#App_Closed_Handler() {
		//
		//Check if the Platform is Invalid and quit the App
		if (process.platform !== "darwin") this.App.quit();
	}

	//Handles the event when the Window is Closed
	#Window_Closed_Handler() {
		//
		//Clear the Main Window
		this.Main_Window = null;
	}

	//Handles the Event when the App is Ready
	#Ready_Handler() {
		//
		//Setup the New Main Window
		this.Main_Window = new BrowserWindow({ width: 1280, height: 720 });

		//Remove the Default Menu Bar
		this.Main_Window.removeMenu();

		//Load the Requested URL on the Main Window
		this.Main_Window.loadURL(this.Requested_URL);

		//Listen for Window Closed Events
		this.Main_Window.on("closed", this.#Window_Closed_Handler.bind(this));
	}
}
