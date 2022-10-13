import { Component, HostListener } from "@angular/core";

@Component({
    template:''
})
export class Modal {
    public wasInside: boolean = false;
    public count:number=0;
    public identificator:string='';
    constructor() {
    }

    close(){}

    pressButton(){
      this.close();
    }
    
    //Como se cierra al detectar los click
    //El que se abre con click es el 'restart game'.
    //Por lo tanto, creamos la funcion que se usa cuando se abren modals sin apretar nada.
    //Cuando es un modal con click, se debe utilizar override y retornar this.count>1 
    getIsOpenWithButton():boolean{
      return this.count>=1;
    }

  @HostListener('document:click', ['$event']) clickInside(event: any) {
    try {
      const classNames: string = event.target.classList.value;
      this.wasInside? this.count++ :'';

      if (classNames.length > 0) {
        if (!classNames.includes('in-card') && this.getIsOpenWithButton() ) {
            this.close();
            this.count=0;
        }
      }
    } catch (err) {
      console.error('Este es el error', err);
    }
  }

    /*Escucha los enventos del teclado y ejecuta la acción correspondiente*/
    @HostListener('document:keydown', ['$event'])
    listenerKeyPress(event: KeyboardEvent) {
  
      if(this.wasInside){
        switch(event.key.toLowerCase()){
          case 'escape': this.close(); break;
          case 'enter': this.pressButton(); break;
          default: break;
        }
      }
    }
}

