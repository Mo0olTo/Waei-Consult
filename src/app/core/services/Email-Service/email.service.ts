import emailjs from '@emailjs/browser';
import { Injectable } from '@angular/core';
import { EMAILJS_CONFIG } from '../../email/emailjs.config';
import { from, Observable } from 'rxjs';
import { ContactReq } from '../../../shared/models/contact-req';
import { DiagnosisReq } from '../../../shared/models/diagnosis-req';

@Injectable({
  providedIn: 'root',
})
export class EmailService { 


  sendDiagnosisEmail( data: DiagnosisReq ): Observable<unknown> {
    return from(
      emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.diagnosisTemplateId,
        data,
        { publicKey: EMAILJS_CONFIG.publicKey }
      )
    );
  }

  sendContactEmail(data: ContactReq ): Observable<unknown> {
    return from(
      emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.contactTemplateId,
        data,
        { publicKey: EMAILJS_CONFIG.publicKey }
      )
    );
  }


}
