import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FAQComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  faq = [
    {
      title: 'Do I need to sign up to view the site?',
      desc: `The short answer is no. However, if you would like access to additional features, interacting with other users or
    setup a profile, signing up is a requirement.`,
    },
    {
      title: 'Can I submit article from any website?',
      desc: 'Articles can be submitted from any relevant website which are bound by community guidelines.',
    },
    {
      title: 'Can I report a bug, user or provide general feedback?',
      desc: `We welcome all bug and feedback reports. This will allow the website to be created around the user experience.
      Likewise, If you feel a user has crossed community guidelines, please use the contact us page in both instances.`,
    },
  ];
}
