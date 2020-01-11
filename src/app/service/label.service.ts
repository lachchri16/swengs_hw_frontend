import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http: HttpClient) {  }

  retrieveLabelOptions() {
    return this.http.get <any[]> ('/api/label/options');
  }
}
