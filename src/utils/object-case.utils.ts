export function removeCamelCaseFields(obj: object) {
  for (const key in obj) {
    if (/^[a-z][a-zA-Z0-9]*$/.test(key) && key.split(/A-Z/).length > 1) {
      delete obj[key];
    }
  }
  return obj;
}
