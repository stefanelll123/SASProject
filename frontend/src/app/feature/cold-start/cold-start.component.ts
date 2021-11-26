import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cold-start',
  templateUrl: './cold-start.component.html',
  styleUrls: ['./cold-start.component.scss']
})
export class ColdStartComponent implements OnInit {

  preferences= [];
  items= [
    {
      id:1,
      name: 'Mobile Application'
    },
    {
      id:2,
      name: 'Web Application'
    },
    {
      id:3,
      name: 'Quality Assurance'
    },
    {
      id:4,
      name: 'Database administrator'
    },
    {
      id:5,
      name: 'Network administrator'
    },
    {
      id:6,
      name: 'Web Application'
    },
    {
      id:7,
      name: 'Quality Assurance'
    },
    {
      id:8,
      name: 'Database administrator'
    },
    {
      id:9,
      name: 'Network administrator'
    },
    {
      id:10,
      name: 'Web Application'
    },
    {
      id:11,
      name: 'Quality Assurance'
    },
    {
      id:12,
      name: 'Database administrator'
    },
    {
      id:13,
      name: 'Network administrator'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  modifyPreferences(item) {

    const indexOfSelectedItem = this.preferences.indexOf(item.id);

    indexOfSelectedItem === -1 ? this.preferences.push(item.id) : this.preferences.splice(indexOfSelectedItem,1)

    console.log(this.preferences);
  }

}
