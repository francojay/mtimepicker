import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import * as datefn from 'date-fns';
declare var $: any;

@Component({
  selector: 'm-timepicker',
  templateUrl: './mtimepicker.component.html',
  styleUrls: ['./mtimepicker.style.scss']
})
export class MtimepickerComponent implements OnInit, OnDestroy {
  @Input()
  settings: any;
  @Output()
  chosen: EventEmitter<any> = new EventEmitter();
  @ViewChild('timeScroller')
  public timeScroller;
  public dateObj = new Date();
  public month = this.dateObj.getMonth();
  public date = this.dateObj.getDate();
  public year = this.dateObj.getFullYear();
  public timeSelected: any;
  public timeCtrl: FormControl;
  public filteredTime: any = [];
  public isScroll: boolean;
  constructor() {}
  public time = [
    new Date(this.year, this.month, this.date, 0, 0, 0, 0),
    new Date(this.year, this.month, this.date, 0, 30, 0, 0),
    new Date(this.year, this.month, this.date, 1, 0, 0, 0),
    new Date(this.year, this.month, this.date, 1, 30, 0, 0),
    new Date(this.year, this.month, this.date, 2, 0, 0, 0),
    new Date(this.year, this.month, this.date, 2, 30, 0, 0),
    new Date(this.year, this.month, this.date, 3, 0, 0, 0),
    new Date(this.year, this.month, this.date, 3, 30, 0, 0),
    new Date(this.year, this.month, this.date, 4, 0, 0, 0),
    new Date(this.year, this.month, this.date, 4, 30, 0, 0),
    new Date(this.year, this.month, this.date, 5, 0, 0, 0),
    new Date(this.year, this.month, this.date, 5, 30, 0, 0),
    new Date(this.year, this.month, this.date, 6, 0, 0, 0),
    new Date(this.year, this.month, this.date, 6, 30, 0, 0),
    new Date(this.year, this.month, this.date, 7, 0, 0, 0),
    new Date(this.year, this.month, this.date, 7, 30, 0, 0),
    new Date(this.year, this.month, this.date, 8, 0, 0, 0),
    new Date(this.year, this.month, this.date, 8, 30, 0, 0),
    new Date(this.year, this.month, this.date, 9, 0, 0, 0),
    new Date(this.year, this.month, this.date, 9, 30, 0, 0),
    new Date(this.year, this.month, this.date, 10, 0, 0, 0),
    new Date(this.year, this.month, this.date, 10, 30, 0, 0),
    new Date(this.year, this.month, this.date, 11, 0, 0, 0),
    new Date(this.year, this.month, this.date, 11, 30, 0, 0),
    new Date(this.year, this.month, this.date, 12, 0, 0, 0),
    new Date(this.year, this.month, this.date, 12, 30, 0, 0),
    new Date(this.year, this.month, this.date, 13, 0, 0, 0),
    new Date(this.year, this.month, this.date, 13, 30, 0, 0),
    new Date(this.year, this.month, this.date, 14, 0, 0, 0),
    new Date(this.year, this.month, this.date, 14, 30, 0, 0),
    new Date(this.year, this.month, this.date, 15, 0, 0, 0),
    new Date(this.year, this.month, this.date, 15, 30, 0, 0),
    new Date(this.year, this.month, this.date, 16, 0, 0, 0),
    new Date(this.year, this.month, this.date, 16, 30, 0, 0),
    new Date(this.year, this.month, this.date, 17, 0, 0, 0),
    new Date(this.year, this.month, this.date, 17, 30, 0, 0),
    new Date(this.year, this.month, this.date, 18, 0, 0, 0),
    new Date(this.year, this.month, this.date, 18, 30, 0, 0),
    new Date(this.year, this.month, this.date, 19, 0, 0, 0),
    new Date(this.year, this.month, this.date, 19, 30, 0, 0),
    new Date(this.year, this.month, this.date, 20, 0, 0, 0),
    new Date(this.year, this.month, this.date, 20, 30, 0, 0),
    new Date(this.year, this.month, this.date, 21, 0, 0, 0),
    new Date(this.year, this.month, this.date, 21, 30, 0, 0),
    new Date(this.year, this.month, this.date, 22, 0, 0, 0),
    new Date(this.year, this.month, this.date, 22, 30, 0, 0),
    new Date(this.year, this.month, this.date, 23, 0, 0, 0),
    new Date(this.year, this.month, this.date, 23, 30, 0, 0)
  ];

  public ngOnInit() {
    if (this.settings) {
      if (this.settings.time) {
        const time = datefn.format(this.settings.time, 'h:mm A');
        if (time !== 'Invalid Date') {
          this.timeSelected = datefn.format(this.settings.time, 'h:mm A');
        }
      }
      this.isScroll = this.settings.scroll;
    }
    this.timeCtrl = new FormControl();
    this.filteredTime = this.timeCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterTime(name));
  }

  public filterTime(val: string) {
    return val
      ? this.time.filter(
          s =>
            s
              .toString()
              .toLowerCase()
              .indexOf(val.toLowerCase()) !== -1
        )
      : this.time;
  }

  public timeKeydown(event) {
    if (event.keyCode === 13) {
      event.target.value = this.formatTime(event.target.value);
      const time = new Date();
      const parts = event.target.value.match(/(\d+):(\d+) (AM|PM)/);
      if (parts) {
        let hours = Number(parts[1]);
        const minutes = Number(parts[2]);
        const tt = parts[3];
        if (tt === 'PM' && hours < 12) {
          hours += 12;
        }
        time.setHours(hours, minutes, 0, 0);
      }
      this.chosen.emit(time);
    }
  }

  public timeOut(event) {
    event.target.value = this.formatTime(event.target.value);
    const time = new Date();
    const parts = event.target.value.match(/(\d+):(\d+) (AM|PM)/);
    if (parts) {
      let hours = Number(parts[1]);
      const minutes = Number(parts[2]);
      const tt = parts[3];
      if (tt === 'PM' && hours < 12) {
        hours += 12;
      }
      time.setHours(hours, minutes, 0, 0);
      this.chosen.emit(time);
    } else {
      this.chosen.emit('');
    }
  }

  private formatTime(time) {
    time = time.replace(':', '');
    time = time.replace(' ', '');
    if (time.length === 1) {
      time = `${time[0]}:00 AM`;
    }
    if (time.length === 2) {
      if (time[1].toLowerCase() === 'p') {
        time = `${time[0]}:00 PM`;
      } else if (time[1].toLowerCase() === 'a') {
        time = `${time[0]}:00 AM`;
      } else {
        time = `${time[0]}${time[1]}:00 AM`;
      }
    }
    if (time.length === 3) {
      if (time[2].toLowerCase() === 'p') {
        time = `${time[0]}${time[1]}:00 PM`;
      } else if (time[1].toLowerCase() === 'p') {
        time = `${time[0]}:00 PM`;
      } else if (time[2].toLowerCase() === 'a') {
        time = `${time[0]}${time[1]}:00 AM`;
      } else if (time[1].toLowerCase() === 'a') {
        time = `${time[0]}:00 AM`;
      } else {
        time = `${time[0]}:${time[1]}${time[2]} AM`;
      }
    }

    if (time.length === 4) {
      if (time[3].toLowerCase() === 'p') {
        time = `${time[0]}:${time[1]}${time[2]} PM`;
      } else if (time[2].toLowerCase() === 'p') {
        time = `${time[0]}${time[1]}:00 PM`;
      } else if (time[3].toLowerCase() === 'a') {
        time = `${time[0]}:${time[1]}${time[2]} AM`;
      } else if (time[2].toLowerCase() === 'a') {
        time = `${time[0]}${time[1]}:00 AM`;
      } else {
        time = `${time[0]}${time[1]}:${time[2]}${time[3]} AM`;
      }
    }

    if (time.length === 5) {
      if (time[4].toLowerCase() === 'p') {
        time = `${time[0]}${time[1]}:${time[2]}${time[3]} PM`;
      } else if (time[3].toLowerCase() === 'p') {
        time = `${time[0]}:${time[1]}${time[2]} PM`;
      } else if (time[4].toLowerCase() === 'a') {
        time = `${time[0]}${time[1]}:${time[2]}${time[3]} AM`;
      } else if (time[3].toLowerCase() === 'a') {
        time = `${time[0]}:${time[1]}${time[2]} AM`;
      } else {
        time = `${time[0]}${time[1]}:${time[2]}${time[3]} AM`;
      }
    }

    if (time.length === 6) {
      if (time[4].toLowerCase() === 'p') {
        time = `${time[0]}${time[1]}:${time[2]}${time[3]} PM`;
      } else if (time[4].toLowerCase() === 'a') {
        time = `${time[0]}${time[1]}:${time[2]}${time[3]} AM`;
      } else {
        time = `${time[0]}${time[1]}:${time[2]}${time[3]} AM`;
      }
    }
    if (!time.match(/^([1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)?$/i)) {
      return '';
    } else {
      return time.toUpperCase();
    }
  }

  public scrollToTime() {
    if (this.isScroll) {
      setTimeout(() => {
        let closestIndex: number;
        this.time.map((time, index) => {
          const difference = datefn.differenceInMinutes(
            new Date(),
            new Date(time)
          );
          if (difference < 30 && difference >= 0) {
            closestIndex = index;
            console.log(datefn.differenceInMinutes(new Date(), time));
          }
        });
        try {
          this.timeScroller.nativeElement.scroll({
            top: closestIndex * 50 - 65,
            left: 0,
            behavior: 'smooth'
          });
        } catch (err) {}
      }, 100);
    }
  }

  public selectTime(time, index) {
    this.timeSelected = datefn.format(time, 'hh:mm A');
    this.chosen.emit(time);
  }

  public clearTime() {
    this.timeSelected = '';
    this.chosen.emit('');
    this.scrollToTime();
  }

  public ngOnDestroy() {}
}
