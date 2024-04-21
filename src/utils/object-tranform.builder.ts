type Tranformer = (object: object) => object;

export class ObjectTransformBuilder {
  private transformers: Tranformer[] = [];
  constructor(private object: object) {}

  addTransform(transformer: Tranformer) {
    this.transformers.push(transformer);
    return this;
  }

  transform() {
    return this.transformers.reduce(
      (transformedObj, transformer) => transformer(transformedObj),
      this.object,
    );
  }
}
