import { Component, OnInit } from '@angular/core';
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem } from '@angular/material/list';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NgIf, NgClass } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    imports: [MatSidenavContainer, MatSidenav, MatNavList, MatListItem, RouterLink, MatIcon, NgIf, NgClass, MatToolbar, RouterOutlet]
})
export class SidebarComponent implements OnInit {

  opened: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
