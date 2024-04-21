import { PipeTransform, Injectable } from '@nestjs/common';
import { removeCamelCaseFields } from '@src/utils/object-case.utils';
import { ObjectTransformBuilder } from '@src/utils/object-tranform.builder';
import { decamelizeKeys } from 'humps';

@Injectable()
export class CamelizePipe implements PipeTransform {
  private handleObjectValue(value: object) {
    const tranformerBuilder = new ObjectTransformBuilder(value);
    return tranformerBuilder
      .addTransform(removeCamelCaseFields)
      .addTransform(decamelizeKeys)
      .transform();
  }
  transform(value: any) {
    return typeof value === 'object' ? this.handleObjectValue(value) : value;
  }
}
