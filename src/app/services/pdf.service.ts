import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { env } from 'src/environments/environment';
import { PdfRequest } from '../models/pdf.model';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private readonly url = `${env.url}/pdf`;

  constructor(private readonly http:HttpClient) { }

  generatePdf(pdfRequest: PdfRequest){
    const options = {
      responseType: 'blob' as 'json'
    }
    return this.http.post(this.url, pdfRequest, options)
  }
}
