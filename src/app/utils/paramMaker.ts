import { HttpParams } from '@angular/common/http';
export function paramMaker(data: Object) {
  let httpParams = new HttpParams();
  if (data) {
    Object.keys(data).forEach((key) => {
      if (data[key] && Array.isArray(data[key])) {
        data[key].forEach((item, index) => {
          if (typeof item === 'object') {
            var itemKeys = Object.keys(item);
            itemKeys.forEach((itemKey) => {
              httpParams = httpParams.append(
                key + '[' + index + '].' + itemKey,
                item[itemKey]
              );
            });
          } else {
            httpParams = httpParams.append(key + '[' + index + ']', item);
          }
        });
      } else {
        if (data[key] != null && data[key] != undefined)
          httpParams = httpParams.append(key, data[key]);
      }
    });
  }

  return httpParams;
}
