import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../entities/employee.entity';
import { EmployeeDefinition, EmployeeDocument } from '../models/employee.model';

@Injectable()
export class EmployeeMongoRepository {
  constructor(
    @InjectModel(EmployeeDefinition.name)
    private employeeModel: Model<EmployeeDocument>,
  ) {}

  create(employee: Employee) {
    return this.employeeModel.create(employee);
  }

  getAll() {
    return this.employeeModel.find({});
  }

  async getById(id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException(
        'The provided ID is not of a valid format.',
      );
    }

    return this.employeeModel.findById(id);
  }

  update() {
    return `This action updates a employee`;
  }

  remove() {
    return `This action removes a employee`;
  }
}
