import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'  //Pone el servicio global en toda la aplicacion
})
export class GifsService {

  private apikey: string = 'tCjmvVreM9QjroUePovJ1m40AKpKYKr5';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] =[];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial]
  }

  constructor ( private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    // if(localStorage.getItem('historial')) {
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );
    // }

  }

  buscarGifs(query: string) {

    query = query.trim().toLocaleLowerCase(); //

    if(!this._historial.includes(query)){ //para que lo incluya en el arreglo solo si no existe
      this._historial.unshift(query)
      this._historial = this._historial.splice(0,10) //para que solo muestre 10 valores

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
          .set('api_key', this.apikey)
          .set('limit', '10')
          .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })

  }

}
