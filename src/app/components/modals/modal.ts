import { Component, HostListener } from "@angular/core";

@Component({
    template:''
})
export class Modal {
    public wasInside: boolean = false;
    constructor() {
    }

    close(){

    }
    
  @HostListener('document:click', ['$event']) clickInside(event: any) {
    try {
      const classNames: string = event.target.classList.value;
      if (classNames.length > 0) {
        if (!this.wasInside && !classNames.includes('in-card')) {
            //this.optionIdentificator = -1;
            this.close();
        }
      }
    } catch (err) {
      console.error('Este es el error', err);
    }
    this.wasInside = false;
  }
}