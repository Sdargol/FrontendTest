//  view, sort, order, filter
// вернуть объект с параметрами URL
export function urlParamsToObject(urlSource){
    let _url = new URL(urlSource);
    
    const view = _url.searchParams.get('view');
    const sort = _url.searchParams.get('sort');
    const order = _url.searchParams.get('order');
    const filter = _url.searchParams.get('filter');

    return {view, sort, order, filter}
}

//  установить новый URL в историю
export function urlSetParams(urlSource, urlParamsObject){
    let _url = new URL(urlSource);
    
    _url.searchParams.set(urlParamsObject.urlParamsName, urlParamsObject.urlParamsNameValue);

    window.history.pushState(null,null,_url);
}

// создать объект с названием параметра и его значением
export function urlCreateParamsObject(urlParamsName, urlParamsNameValue){
    return {urlParamsName, urlParamsNameValue}
}