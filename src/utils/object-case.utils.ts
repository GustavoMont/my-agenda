export function removeCamelCaseFields(obj: object) {
  for (const key in obj) {
    if (/^[a-z][a-zA-Z0-9]*$/.test(key)) {
      delete obj[key];
    }
  }
  return obj;
}
