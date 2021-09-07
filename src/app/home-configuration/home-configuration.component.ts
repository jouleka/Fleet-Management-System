import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-configuration',
  templateUrl: './home-configuration.component.html',
  styleUrls: ['./home-configuration.component.css']
})
export class HomeConfigurationComponent implements OnInit {

  image: string = 'assets/images/fleet-management-494a03ec.jpeg'

  constructor() { }

  ngOnInit(): void {
  }

}
