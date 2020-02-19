import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LoggerService {
  constructor() {}
  logError(errorMessage) {
    console.log("LoggingService: " + JSON.stringify(errorMessage));
  }
}
