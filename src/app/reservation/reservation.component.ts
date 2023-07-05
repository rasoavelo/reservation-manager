import { Component } from '@angular/core';
import { DayPilot } from 'daypilot-pro-angular';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  fillerContent = Array.from(
    { length: 5 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );
  config: DayPilot.SchedulerConfig = {
    timeHeaders: [
      { groupBy: "Month" },
      { groupBy: "Week" },
      { groupBy: "Day", format: "d" }
    ],
    scale: "Day",
    days: DayPilot.Date.today().daysInMonth(),
    startDate: DayPilot.Date.today().firstDayOfMonth(),
    onBeforeTimeHeaderRender: function (args) {
      if (args.header.level === 1) {
        args.header.html = args.header.start.weekNumberISO() + "/" + args.header.start.getYear();
      }
    },
    rowHeaderColumnsMode: "Tabular",
    rowHeaderColumns: [
      { text: 'Name', display: "name", sort: "name" },
      { text: 'Floor', display: "location", sort: "location" },
      { text: 'Size', display: "size", sort: "size" }
    ],
    resources: [
      { id: "101", tags: { name: "Room 101", location: "Floor 1", size: "2 beds" } },
      { id: "102", tags: { name: "Room 102", location: "Floor 1", size: "3 beds" } },
      { id: "103", tags: { name: "Room 103", location: "Floor 1", size: "1 bed" } },
      { id: "201", tags: { name: "Room 201", location: "Floor 2", size: "2 beds" } },
      { id: "101", tags: { name: "Room 101", location: "Floor 1", size: "2 beds" } },
      { id: "102", tags: { name: "Room 102", location: "Floor 1", size: "3 beds" } },
      { id: "103", tags: { name: "Room 103", location: "Floor 1", size: "1 bed" } },
      { id: "201", tags: { name: "Room 201", location: "Floor 2", size: "2 beds" } },
    ],
    onTimeRangeSelected: async (args) => {
      const dp = args.control;
      const modal = await DayPilot.Modal.prompt("Create a new reservation:", "Event 1");
      dp.clearSelection();
      if (modal.canceled) { return; }
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        resource: args.resource,
        text: modal.result
      });
    },
    eventMoveHandling: "Update",
    onEventMoved: (args) => {
      args.control.message("Event moved: " + args.e.text());
    },
    eventResizeHandling: "Update",
    onEventResized: (args) => {
      args.control.message("Event resized: " + args.e.text());
    },
    eventDeleteHandling: "Update",
    onEventDeleted: (args) => {
      args.control.message("Event deleted: " + args.e.text());
    },
    eventClickHandling: "Disabled",
    eventHoverHandling: "Bubble",
    bubble: new DayPilot.Bubble({
      onLoad: (args) => {
        // if event object doesn't specify "bubbleHtml" property 
        // this onLoad handler will be called to provide the bubble HTML
        args.html = "Event details";
      }
    }),
    treeEnabled: true,
  }
  events = [
    {
      "id": 1,
      "resource": "R1",
      "start": "2023-07-04T00:00:00",
      "end": "2023-07-08T00:00:00",
      "text": "Event 1"
    },
    {
      "id": 2,
      "resource": "R1",
      "start": "2023-07-12T00:00:00",
      "end": "2023-07-16T00:00:00",
      "text": "Event 2"
    }
  ]
}
