import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Storage';
  greenClass: any;
  orageClass: boolean = true;
  blushClass: boolean;
  cyanClass: boolean;
  timberClass: boolean;
  blueClass: boolean;
  amethystClass: boolean;
  localStorageTheme: String;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) { }

  ngOnInit(): void {
    const className = document.getElementById('MooliHtml');
    this.localStorageTheme = localStorage.getItem('theme');
    className.setAttribute('data-theme', localStorage.getItem('theme'));

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    )
      .subscribe(() => {

        var rt = this.getChild(this.activatedRoute)

        rt.data.subscribe(data => {
          this.titleService.setTitle(data.title)
        })
      });

    setTimeout(() => {

      document.getElementsByClassName('page-loader-wrapper')[0].classList.add("HideDiv");

    }, 1000);
  }

  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }

  }

  ToggleDarkMode(e) {
    const className = document.getElementById('MooliHtml')
    if (e.target.checked) {
      className.setAttribute('data-theme', 'dark');
    }
    else {
      className.setAttribute('data-theme', 'light');
    }
  }
  ToggleRTL(e) {
    const body = document.getElementsByTagName('body')[0];
    if (e.target.checked) {
      body.classList.add('rtl_active');
    }
    else {
      body.classList.remove('rtl_active');
    }
  }


  themeColor(color) {
    this.greenClass = false;
    this.orageClass = false;
    this.blushClass = false;
    this.cyanClass = false;
    this.timberClass = false;
    this.blueClass = false;
    this.amethystClass = false;
  }

  closeMenu() {
    document.getElementById('rightbar').classList.remove("open");
    document.getElementsByClassName('sticky-note')[0].classList.remove("open");
    document.getElementsByClassName('overlay')[0].classList.remove("open");
    document.getElementsByTagName('body')[0].classList.remove("offcanvas-active");
  }
}
