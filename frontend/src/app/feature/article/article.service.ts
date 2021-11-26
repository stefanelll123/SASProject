import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles = [
    {
      "_id":{
        "$oid":"61a09902d4513ddcdd8c6979"
      },
      "id":"e121dd1d55e",
      "title":"Build A Real World Beautiful Web APP with Angular \\xe2\\x80\\x94 A to Z Ultimate Guide \\xe2\\x80\\x94 PART I",
      "subtitle":"No more ugly tutorials projects! No more fictional brands examples!",
      "source":"https://medium.com/@hamedbaatour/build-a-real-world-beautiful-web-app-with-angular-6-a-to-z-ultimate-guide-2018-part-i-e121dd1d55e",
      "cover":"1*y3c9ggOkOzdAr8JC7TUrEQ@2x.png",
      "primaryTopic":"Javascript",
      "topics":["Visual Design","Design","Javascript","Programming"],
      "tags":["JavaScript","Angular","HTML","Angular 6","CSS"],
      "claps":40799,
      "readingTime":12.274528301886793,
      "recommends":6748
    },
    {"_id":{"$oid":"61a09903d4513ddcdd8c697a"},"id":"c5c52d620176","title":"Angular vs. React vs. Vue: A 2017 comparison","subtitle":"Deciding on a JavaScript framework for your web application can be overwhelming. Angular and React are very popular these days, and there\\xe2\\x80\\xa6","source":"https://medium.com/pixelpassion/angular-vs-react-vs-vue-a-2017-comparison-c5c52d620176","cover":"1*xRhs4h2a_rGpXNpoSNlA9w.png","primaryTopic":"Javascript","topics":["Javascript"],"tags":["JavaScript","Angular2","React","Vuejs","Single Page Applications"],"claps":40502,"readingTime":24.238993710691823,"recommends":5480},
    {"_id":{"$oid":"61a09908d4513ddcdd8c697f"},"id":"c594e22e7b8c","title":"Version 7 of Angular\\xe2\\x80\\x8a\\xe2\\x80\\x94\\xe2\\x80\\x8aCLI Prompts, Virtual Scroll, Drag and Drop and more","subtitle":"The 7.0.0 release of Angular is here! This is a major release spanning the entire platform, including the core framework, Angular Material\\xe2\\x80\\xa6","source":"https://blog.angular.io/version-7-of-angular-cli-prompts-virtual-scroll-drag-and-drop-and-more-c594e22e7b8c","cover":"1*CQKUmJrBs-523I4GOiEUaA.gif","primaryTopic":"Javascript","topics":["Software Engineering","Javascript"],"tags":["JavaScript","Angular","Release Notes","Web Development","Software Development"],"claps":17980,"readingTime":3.7050314465408807,"recommends":2667},
    {"_id":{"$oid":"61a09914d4513ddcdd8c698b"},"id":"27d372f5eb4e","title":"Angular 5.1 & More Now Available","subtitle":"We are pleased to announce version 5.1.0 of Angular. This is a minor release containing several smaller features and bugfixes. We are also\\xe2\\x80\\xa6","source":"https://blog.angular.io/angular-5-1-more-now-available-27d372f5eb4e","cover":"1*b1YXMZFX0o_tt6_9_EkGEg.jpeg","primaryTopic":"Javascript","topics":["Javascript"],"tags":["JavaScript","Software Engineering","Web Development","Typescript","Release Notes"],"claps":8016,"readingTime":3.8000000000000003,"recommends":1224},
    {"_id":{"$oid":"61a0a8402f7dc7a11134e4ef"},"id":"4a52d4bd2700","title":"The State of CSS in Angular","subtitle":"Styling applications is a critical part of delivering great experiences for users. Across the web we have Cascading Style Sheets (CSS) as a\\xe2\\x80\\xa6","source":"https://blog.angular.io/the-state-of-css-in-angular-4a52d4bd2700","cover":"1*FoDwSKAjXIUwtLwVv25t6A.png","primaryTopic":"Javascript","topics":["Javascript"],"tags":["Web Development","Software Engineering","CSS","Web Standards","Angular"],"claps":1627,"readingTime":3.577358490566038,"recommends":345},
  ];

  constructor() { }

  getArticles() {

    return this.articles;
  }
}
