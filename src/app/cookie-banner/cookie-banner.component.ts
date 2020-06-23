import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.css']
})
export class CookieBannerComponent {
  get allowedCookies() { return localStorage.getItem('allowedCookies'); }

  agree() {
    const $ = (selector) => document.querySelector(selector);

    $('.cookies').style.transform = 'translateY(60%) scale(0.8)';
      $('.cookies').style.opacity = '0';
      $('.cookies').style.filter = 'blur(3px)';

      setTimeout(() => {
        $('.cookies').style.transform = 'translateY(-100%)';
        localStorage.setItem('allowedCookies', 'true');
      }, 400);
  }
}
