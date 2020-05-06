import {HttpRequest} from "../HttpRequest";
import {HttpResponse} from "../HttpResponse";
import {ObjectedMap} from "../ObjectedMap";
import {ServerOptions} from "http";

export class HttpServerOption extends ObjectedMap<ServerOptions> {
  static create(options: ServerOptions = {}) {
    const httpsServerOption = new HttpServerOption();
    if (options) {
      (<Array<keyof ServerOptions>>Object.keys(options)).forEach(key => {
        httpsServerOption.set(key, options[key]);
      });
    }
    if (!httpsServerOption.has("IncomingMessage")) {
      httpsServerOption.set("IncomingMessage", HttpRequest)
    }
    if (!httpsServerOption.has("ServerResponse")) {
      httpsServerOption.set("ServerResponse", HttpResponse)
    }
    return httpsServerOption;
  }
}
