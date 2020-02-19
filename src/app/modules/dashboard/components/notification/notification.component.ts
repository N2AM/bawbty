import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"]
})
export class NotificationComponent implements OnInit {
  days = [];
  open: boolean = false;
  selectedDay = 5;
  constructor() {
    for (let i = 1; i <= 15; i++) {
      this.days.push(i);
    }
  }

  ngOnInit() {}
}
