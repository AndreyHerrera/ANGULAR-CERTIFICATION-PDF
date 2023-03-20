import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PdfService } from '../../services/pdf.service';
import { PdfRequest } from '../../models/pdf.model';

@Component({
  selector: 'body',
  templateUrl: './pdf.component.html'
})
export class PdfComponent implements OnInit {
  public formGroup!: FormGroup;
  public blob: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly PdfService: PdfService
  ) {
    this.formPdf();
  }

  ngOnInit(): void {
  }

  private formPdf(){
    this.formGroup = this.formBuilder.group({
      nombreEmpleado: [null, Validators.required],
      cedulaEmpleado: [null, Validators.required],
      salarioEmpleado: [null, Validators.required],
      fechaInicioEmpleado: [null, Validators.required],
      fechaFinEmpleado: [null, Validators.required]
  })}

  onSubmitForm(){
    if (this.formGroup.valid){
      const pdfRequest : PdfRequest = {
      nombreEmpleado: this.formGroup.value.nombreEmpleado,
      cedulaEmpleado: this.formGroup.value.cedulaEmpleado,
      salarioEmpleado: this.formGroup.value.salarioEmpleado,
      fechaInicioEmpleado: this.formGroup.value.fechaInicioEmpleado,
      fechaFinEmpleado: this.formGroup.value.fechaFinEmpleado
      }
      this.PdfService.generatePdf(pdfRequest).subscribe((data: any) => {
        this.blob = new Blob([data], {type: 'application/pdf'});
        const downloadUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `Certificado - ${pdfRequest.nombreEmpleado}.pdf`;
        link.click()
      });
    }
  }

}
