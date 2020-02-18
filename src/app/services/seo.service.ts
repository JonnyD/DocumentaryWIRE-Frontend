import { Injectable, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class SEOService {
    constructor(private title: Title, @Inject(DOCUMENT) private doc) {
    }

    setPageTitle(title: string) {
        this.title.setTitle(title);
    }

    getPageTitle() {
        return this.title.getTitle();
    }

    createOrUpdateLinkForCanonicalURL() {
        var canonical = document.querySelector('link[rel="canonical"]');

        if (canonical) {
            canonical.href = this.doc.URL;
        } else {
            let link: HTMLLinkElement = this.doc.createElement('link');
            link.setAttribute('rel', 'canonical');
            this.doc.head.appendChild(link);
            link.setAttribute('href', this.doc.URL);
        }
    }

    createPreviousPage(page) {
        let url = this.doc.URL.split('?')[0] + "?page=" + page;

        var previous = document.querySelector('link[rel="prev"]');

        if (previous) {
            previous.href = url;
        } else {
            let link: HTMLLinkElement = this.doc.createElement('link');
            link.setAttribute('rel', 'prev');
            this.doc.head.appendChild(link);
            link.setAttribute('href', url);
        }
    }

    deletePreviousPage() {
        var previous = document.querySelector('link[rel="prev"]');
        if (previous) {
            previous.parentNode.removeChild(previous);
        }
    }

    createNextPage(page) {
        let url = this.doc.URL.split('?')[0] + "?page=" + page;

        let next = document.querySelector('link[rel="next"]');

        if (next) {
            next.href = url;
        } else {
            let link: HTMLLinkElement = this.doc.createElement('link');
            link.setAttribute('rel', 'next');
            this.doc.head.appendChild(link);
            link.setAttribute('href', url);
        }
    }

    deleteNextPage() {
        var next = document.querySelector('link[rel="next"]');
        if (next) {
            next.parentNode.removeChild(next);
        }
    }

    refreshMetaTags(pageTitle: string, page: number, numberOfPages: number) {
        this.setPageTitle(pageTitle);
    
        this.createOrUpdateLinkForCanonicalURL();
    
        if (page > 1 && page <= numberOfPages) {
          this.createPreviousPage(page - 1);
        } else {
          this.deletePreviousPage();
        }
    
        if (page < numberOfPages && page >= 1) {
          console.log(page + 1);
          this.createNextPage(page + 1);
        } else {
          this.deleteNextPage();
        }
      }
} 