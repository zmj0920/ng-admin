import { AbstractControl, ValidatorFn } from '@angular/forms';

const REGEX_STR = {
  num: `((-?\\d+\\.\\d+)|(-?\\d+)|(-?\\.\\d+))`,
  idCard: `(^\\d{15}$)|(^\\d{17}(?:[0-9]|X)$)`,
  mobile: `^(0|\\+?86|17951)?1[0-9]{10}$`,
  url: `(((^https?:(?:\/\/)?)(?:[-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9.-]+(?::\\d+)?|(?:www.|[-;:&=\\+\\$,\\w]+@)[A-Za-z0-9.-]+)((?:\/[\\+~%\\/.\\w-_]*)?\\??(?:[-\\+=&;%@.\\w_]*)#?(?:[\\w]*))?)`,
  ip: `(?:^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$)|(?:^(?:(?:[a-fA-F\\d]{1,4}:){7}(?:[a-fA-F\\d]{1,4}|:)|(?:[a-fA-F\\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|:[a-fA-F\\d]{1,4}|:)|(?:[a-fA-F\\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,2}|:)|(?:[a-fA-F\\d]{1,4}:){4}(?:(?::[a-fA-F\\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,3}|:)|(?:[a-fA-F\\d]{1,4}:){3}(?:(?::[a-fA-F\\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,4}|:)|(?:[a-fA-F\\d]{1,4}:){2}(?:(?::[a-fA-F\\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,5}|:)|(?:[a-fA-F\\d]{1,4}:){1}(?:(?::[a-fA-F\\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$)`,
  color: `(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\\b|(?:rgb|hsl)a?\\([^\\)]*\\)`,
  chinese: `[\u4e00-\u9fa5]+`
};
function genRegex(str: string, flags?: string) {
  return new RegExp(`^${str}$`, flags);
}
const REGEX = {
  num: genRegex(REGEX_STR.num),
  idCard: genRegex(REGEX_STR.idCard, 'i'),
  mobile: genRegex(REGEX_STR.mobile),
  url: genRegex(REGEX_STR.url),
  ip: genRegex(REGEX_STR.ip),
  color: genRegex(REGEX_STR.color),
  chinese: genRegex(REGEX_STR.chinese)
};

/**
 * Wheter is number
 *
 * ???????????????
 */
export function isNum(value: string | number): boolean {
  return REGEX.num.test(value.toString());
}

/**
 * Wheter is integer
 *
 * ???????????????
 */
export function isInt(value: string | number): boolean {
  return isNum(value) && parseInt(value.toString(), 10).toString() === value.toString();
}
/**
 * Wheter is decimal
 *
 * ????????????????????????
 */
export function isDecimal(value: string | number): boolean {
  return isNum(value) && !isInt(value);
}
/**
 * Wheter is People's Republic of China identity card
 *
 * ?????????????????????????????????????????????
 */
export function isIdCard(value: string): boolean {
  return REGEX.idCard.test(value);
}
/**
 * Wheter is china mobile (China)
 *
 * ??????????????????????????????
 */
export function isMobile(value: string): boolean {
  return REGEX.mobile.test(value);
}
/**
 * Wheter is url address
 *
 * ??????URL??????
 */
export function isUrl(url: string): boolean {
  return REGEX.url.test(url);
}
/**
 * Wheter is IPv4 address (Support v4, v6)
 *
 * ??????IP4???????????????v4???v6???
 */
export function isIp(ip: string): boolean {
  return REGEX.ip.test(ip);
}
/**
 * Wheter is color
 *
 * ?????????????????????
 */
export function isColor(color: string): boolean {
  return REGEX.color.test(color);
}
/**
 * Wheter is chinese
 *
 * ????????????
 */
export function isChinese(value: string): boolean {
  return REGEX.chinese.test(value);
}

/**
 * Match two control values
 *
 * ?????????????????????
 * ```ts
 * this.form = new FormGroup({
 *  pwd: new FormControl(''),
 *  repwd: new FormControl(''),
 * }, {
 *  validators: MatchControl('pwd', 'repwd'),
 * });
 * ```
 */
export function MatchControl(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl) => {
    const control = formGroup.get(controlName);
    const matchingControl: any = formGroup.get(matchingControlName);
    if (matchingControl?.errors && !matchingControl.errors?.matchControl) {
      return null;
    }
    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ matchControl: true });
    } else {
      matchingControl?.setErrors(null);
    }
    return null;
  };
}
