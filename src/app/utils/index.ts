import * as _ from 'underscore';

export function sortArray(
  arr: Array<any>,
  prop: string,
  dir: 'asc' | 'desc'
): Array<any> {
  if (dir == 'asc') {
    return (arr = arr.sort((a: any, b: any) => {
      if (a[prop] > b[prop]) return 1;
      if (b[prop] > a[prop]) return -1;
      return 0;
    }));
  } else {
    return (arr = arr.sort((a: any, b: any) => {
      if (a[prop] > b[prop]) return -1;
      if (b[prop] > a[prop]) return 1;
      return 0;
    }));
  }
}

export function textTruncate(str: string, width: number) {
  return str.length > width ? `${str.substring(0, width)}...` : str;
}
export function rearrangeArray(arr: Array<Number>, prop: string) {
  // Sorting the array elements
  arr = arr.sort((a: any, b: any) => {
    if (a[prop] > b[prop]) return -1;
    if (b[prop] > a[prop]) return 1;

    return 0;
  });
  var n = arr.length;
  // To store modified array
  let tempArr: Array<Number> = [];
  // Adding numbers from sorted array
  // to new array accordingly
  let arrIndex = 0;

  var j = n - 1;
  // Traverse from begin and end simultaneously
  for (var i = 0; i <= n / 2 || j > n / 2; i++, j--) {
    if (arrIndex < n) {
      tempArr[arrIndex] = arr[i];
      arrIndex++;
    }

    if (arrIndex < n) {
      tempArr[arrIndex] = arr[j];
      arrIndex++;
    }
  }

  // Modifying original array
  for (var i = 0; i < n; i++) arr[i] = tempArr[i];

  return arr;
}
export function sumValuesForChart(n1: number, n2: number): number {
  if (n1 && n2) {
    return n1 + n2;
  } else {
    if (!n1 && (n2 || n2 == 0)) {
      return n2;
    } else if (!n2 && (n1 || n1 == 0)) {
      return n1;
    } else {
      return NaN;
    }
  }
}
export function calculatePercentage(value: number, dataset: number[]) {
  let sum = 0;
  if (dataset) {
    let data = dataset as number[];
    if (data) {
      data.map((c) => {
        sum += c;
      });
    }
    let result = (value * 100) / sum;
    return result;
  }
  return 0;
}

interface IKeyVal {
  key: string;
  val: any;
}
function jsonToFormDataFormat(obj: Object): IKeyVal[] {
  var arr: IKeyVal[] = [];
  var keys = Object.keys(obj);
  keys.forEach((key) => {
    var prop = key;
    var val = obj[key];
    var isArray = _.isArray(val);
    if (val) {
      if (isArray) {
        var length = (val as Array<any>).length;
        for (let i = 0; i < length; i++) {
          const item = (val as Array<any>)[i];

          var isObject = _.isObject(item);
          if (isObject) {
            var keyObjectArr = jsonToFormDataFormat(item);

            keyObjectArr.forEach((ko) => {
              arr.push({
                key: prop + `[${i}].` + ko.key,
                val: ko.val,
              });
            });
          } else {
            arr.push({
              key: prop + `[${i}]`,
              val: item,
            });
          }
        }
      } else {
        if (val instanceof FileList) {
          for (let i = 0; i < val.length; i++) {
            const element = val[i];
            arr.push({ key: prop, val: element });
          }
        } else {
          arr.push({ key: prop, val: val });
        }
      }
    }
  });
  return arr;
}
export function convertObjectToFormData(object: Object) {
  let formData = new FormData();
  var d = jsonToFormDataFormat(object);
  for (let i = 0; i < d.length; i++) {
    const element = d[i];
    formData.append(element.key, element.val);
  }

  return formData;
}

export function convertObjectArrayToFormData(array: Array<any>) {
  var formData = new FormData();

  array.forEach((obj: any, index) => {
    var d = jsonToFormDataFormat(obj);
    for (let i = 0; i < d.length; i++) {
      const element = d[i];
      formData.append(`[${index}].` + element.key, element.val);
    }
  });
  return formData;
}
export function humanFileSize(bytes, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + ' ' + units[u];
}
