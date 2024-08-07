import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Branch } from 'src/schemas/business/branchSchema';
import { Business } from 'src/schemas/business/businessSchema';
import { LicenseKey } from 'src/schemas/business/licenseKeySchema';
import { emailTemplate } from './html/email.template';
import * as brevo from '@getbrevo/brevo';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name) private businessModel: Model<Business>,
    @InjectModel(Branch.name) private branchModel: Model<Branch>,
    @InjectModel(LicenseKey.name) private licenseKeyModel: Model<LicenseKey>,
  ) {}

  private async sendMail() {
    const businessEx = {
      name: 'Tomate Taqueria',
      email: 'moisesbaldenegromelendez@gmail.com',
      password: 'xS3sGszZsF6',
    };
    const htmlContent = emailTemplate(businessEx);

    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      'aqui va l akey',
    );

    const sendEmail = new brevo.SendSmtpEmail();
    sendEmail.subject = 'Confirmacion: Bienvenido a TomateSoft';
    sendEmail.to = [{ email: 'mc.moisesm16@gmail.com', name: businessEx.name }];
    sendEmail.htmlContent = htmlContent;
    sendEmail.sender = {
      name: 'TomateSOft-POS',
      email: 'no-reply@tomatesoft.com',
    };

    const emailResponse = await apiInstance.sendTransacEmail(sendEmail);
    console.log(emailResponse);
    return emailResponse;
  }

  async createBusiness(business: any) {
    try {
      const res = this.sendMail();
      console.log(res);
      return res;
    } catch (error) {
      console.error('NOPservbice');
    }
  }
}
