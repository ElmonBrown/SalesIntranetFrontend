export function applyFilter(appliedFilter): string {

  const keys: Array<string> = Object.keys(appliedFilter);
  let queryString = '&';
  
  //Excluding empty and null fields
  const filteredKeys = keys.filter(key => 
    appliedFilter[`${key}`] != null &&
    appliedFilter[`${key}`] != ''
  );
  //Preparing queries
  filteredKeys.forEach(key => {
    const field: string = key;
    let value: any = appliedFilter[`${key}`];

    if(Array.isArray(value)) {
      value = generateQueryFromArray(key, value)
      queryString+= `${value}&`;
    } else {
      queryString+= `${field}=${value}&`;
    }
    
  });

  queryString = queryString.slice(0, queryString.length -1);

  return queryString;
  
}

function generateQueryFromArray(key: string, arr: any[]) {
  let arrayQuery: string = '';

  arr.forEach((value , index) => {
    if(index != arr.length - 1) {
      arrayQuery+= `${key}=${value}&`
    } else {
      arrayQuery+= `${key}=${value}`
    }
  });

  return String(arrayQuery);
}