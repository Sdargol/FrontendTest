//sortParams {sort = (id,name,age), order = (maxmin,minmax)}

export function getSortArray(arr, sortParams) {
    let _arr = arr.slice();

    let funcSortByNameOrder = (sort, order) => {
        if (order === "minmax") {
            console.log(`сортировка по полю ${sort} по возрастанию `); // debug
            return (a, b) => a[sort] > b[sort] ? 1 : -1;
        }
        if (order === "maxmin") {
            console.log(`сортировка по полю ${sort} по убыванию `); // debug
            return (a, b) => a[sort] < b[sort] ? 1 : -1;
        }
        if (!order) {
            console.log(`сортировка по полю ${sort}, параметр order отсутствует, сортируем по возрастанию `); // debug
            return (a, b) => a[sort] > b[sort] ? 1 : -1;
        }
        console.log('непонятный order...сортирую по возрастанию'); // debug
        return (a, b) => a[sort] > b[sort] ? 1 : -1;
    }

    // if ((!sortParams.order) && (!sortParams.sort)) {
    //     console.log('параметров сортировки вообще нет, сортируем по id и по возрастанию'); // debug
    //     return _arr.sort(funcSortByNameOrder("id", "minmax"));
    // }

    if ((sortParams.sort === "id") || (sortParams.sort === "name") || (sortParams.sort === "age")) {
        console.log('сортируем (параметр задан)'); // debug
        
        if (!sortParams.order) {
            console.log('параметр order пуст, сортируем по возрастанию'); // debug
            return _arr.sort(funcSortByNameOrder(sortParams.sort, sortParams.order));
        }
        
        console.log('функция выполняется'); // debug
        return _arr.sort(funcSortByNameOrder(sortParams.sort, sortParams.order));
    }

    if(!sortParams.sort){
        if(sortParams.order === "minmax" || sortParams.order === "maxmin"){
            console.log('параметр sort не задан, но порядок сортировки задан...');
            return _arr.sort(funcSortByNameOrder("id", sortParams.order));
        }
    }

    console.log('непонятный тип сортировки...отсортируем по id и возрастанию '); // debug
    return _arr.sort(funcSortByNameOrder("id", "minmax"));
}