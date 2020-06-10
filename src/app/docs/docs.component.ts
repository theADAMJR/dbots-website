import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import marked from 'marked';
import { map } from 'rxjs/operators';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {
  defaultPage = 'getting-started';

  get markdownPagePath$() {
    return this.route.paramMap.pipe(
      map(paramMap => {
        const page = paramMap.get('page')?.toLowerCase() || this.defaultPage;      
        return `assets/docs/${page}.md`;
    }));
  }

  constructor(
    private seo: SeoService,
    private route: ActivatedRoute,
    router: Router) {
    route.paramMap.subscribe(paramMap => {      
      const page = paramMap.get('page')?.toLowerCase();
      if (!page)
        router.navigate([`/docs/${this.defaultPage}`]);
    });
  }

  async ngOnInit() {
    await this.convertToMarkdown();  
  }

  async convertToMarkdown() {
    this.markdownPagePath$.subscribe(async(path) => {      
      const file = await fetch(path);      
      let md = await file.text();

      md = this.setMetaVariables(md);
      
      document.getElementById('doc').innerHTML = marked(md, { breaks: true });
      document.querySelector('h1').classList.add('display-3');
    });
  }

  setMetaVariables(content: string) {
    const tags = {
      description: /<description>(.*)<\/description>/g,
      title: /<title>(.*)<\/title>/g,
      url: /<url>(.*)<\/url>/g,
    };

    const description = tags.description.exec(content)[1];
    const titleSuffix = tags.title.exec(content)[1];
    const route = tags.url.exec(content)[1];

    this.seo.setTags({
      description,
      titleSuffix,
      url: `/docs/${route}`
    });

    return content
      .replace(tags.description, '')
      .replace(tags.title, '')
      .replace(tags.url, '');
  }
}
