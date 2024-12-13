import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Branch } from 'src/schemas/business/branchSchema';
import { Business } from 'src/schemas/business/businessSchema';
import { LicenseKey } from 'src/schemas/business/licenseKeySchema';
// import { emailTemplate } from './html/email.template';
// import * as brevo from '@getbrevo/brevo';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name) private businessModel: Model<Business>,
    @InjectModel(Branch.name) private branchModel: Model<Branch>,
    @InjectModel(LicenseKey.name) private licenseKeyModel: Model<LicenseKey>,
  ) {}

  /*
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
*/
  async createBusiness(business: any) {
    try {
      // const res = this.sendMail();
      const session = await this.businessModel.startSession();
      session.startTransaction();
      const newBusiness = new this.businessModel(business);
      await newBusiness.save();
      await session.commitTransaction();
      session.endSession();
      if (!newBusiness) {
        await session.abortTransaction();
        session.endSession();
        throw new NotFoundException('Business not created');
      }
      return newBusiness;
    } catch (error) {
      console.error('NOPservbice');
    }
  }

  async createBranch(branch: any) {
    try {
      const session = await this.branchModel.startSession();
      session.startTransaction();
      const newBranch = new this.branchModel(branch);
      if (!newBranch) {
        await session.abortTransaction();
        session.endSession();
        throw new NotFoundException('Branch not created');
      }

      const business = await this.businessModel.findByIdAndUpdate(
        branch.businessId,
        { $push: { branches: newBranch._id } },
      );

      if (!business) {
        await session.abortTransaction();
        session.endSession();
        throw new NotFoundException('Business not found');
      }

      await newBranch.save();
      await session.commitTransaction();
      session.endSession();

      return newBranch;
    } catch (error) {
      console.error('NOPservbice');
    }
  }

  async getBusinesses(key: string) {
    try {
      const businesses = await this.businessModel
        .findById(key)
        .populate({
          path: 'branches',
          populate: {
            path: 'devices',
            populate: { path: 'settings', populate: { path: 'printers' } },
          },
        })
        .lean();
      if (!businesses) {
        throw new NotFoundException('Businesses not found');
      }
      return businesses;
    } catch (error) {
      throw new NotFoundException('NOP');
    }
  }

  async createLicenseKey(bussinesId: { bussinesId: string }) {
    try {
      const session = await this.licenseKeyModel.startSession();
      session.startTransaction();
      const newLicenseKey = new this.licenseKeyModel();
      if (!newLicenseKey) {
        await session.abortTransaction();
        session.endSession();
        throw new NotFoundException('LicenseKey not created');
      }
      await newLicenseKey.save();

      const currentBusiness = await this.businessModel.findByIdAndUpdate(
        bussinesId.bussinesId,
        { licenseKey: newLicenseKey._id },
      );

      if (!currentBusiness) {
        await session.abortTransaction();
        session.endSession();
        throw new NotFoundException('Branch not found');
      }
      await session.commitTransaction();
      session.endSession();
      return newLicenseKey;
    } catch (error) {
      console.error('NOPservbice');
    }
  }
}
