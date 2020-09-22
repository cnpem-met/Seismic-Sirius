export const media = (array) => {
    var media = 0;
    for(var i = 0; i < array.length; i++)
        media += parseInt(array[i]);
    return media / array.length;
}

export const hideAxys = (option) => {
    if(option === "preview"){
        return function(){return " ";}
    }
}

export const convertTimestamp = (e) => {
    var date = new Date(e.value*1000);
    return date.toLocaleDateString("pt-BR");
}
