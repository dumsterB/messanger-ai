import Messenger from "./component/index.ts";
import './main.css'

export default {
    install(app:any) { // Removed the 'options' argument
        app.component("Messenger", Messenger);
    },
};

export { Messenger };
