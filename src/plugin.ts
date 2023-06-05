import Messenger from "./page";
import './main.css'

export default {
    install(app:any) { // Removed the 'options' argument
        app.component("Messenger", Messenger);
    },
};

export { Messenger };
