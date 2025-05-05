import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RewritedPeriod } from 'src/schemas/RewritedPeriod/rewritedPeriod';

@Injectable()
export class RewritePeriodService {
  constructor(
    @InjectModel(RewritedPeriod.name)
    private readonly rewritePeriodModel: Model<RewritedPeriod>,
  ) {}

  async createRewritePeriod(body: any) {
    const newRewritePeriod = new this.rewritePeriodModel(body);
    return await newRewritePeriod.save();
  }

  async findAll() {
    return await this.rewritePeriodModel.find().exec();
  }
}
