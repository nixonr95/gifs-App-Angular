import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;  // signo de admiracion para decirle a typeScript que txtBuscar siempre va a tener algo y que lo deje pasar

  constructor (private gifsService: GifsService) {}

  // buscar (termino: string) { 
  //   console.log(termino);
  // }  
  buscar () {
    const valor = this.txtBuscar.nativeElement.value;
    
    if(valor.trim().length === 0){
      return;
    }

    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }  

}
