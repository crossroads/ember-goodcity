import { helper as buildHelper } from '@ember/component/helper';

export default buildHelper(function([string]) {
  return string.capitalize();
});
