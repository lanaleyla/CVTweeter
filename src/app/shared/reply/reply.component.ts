import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReplyComponent>) {
  }

  ngOnInit() {
  }

  get colorB() {
    return 'primary';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
