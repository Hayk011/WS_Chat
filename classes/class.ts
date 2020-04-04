import {Isocket} from "../interfaces/interface"

let myWS = class {
    wss: Isocket;

    constructor(wss: Isocket) {
        this.wss = wss
    }
};
export default myWS