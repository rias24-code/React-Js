export function formateDateTime(date = new Date()){
    const day = date.toLocaleDateString(undefined,{weekday : "long"});
    const dmy = date.toLocaleDateString(undefined, {
        day : "2-digit",
        month : "long",
        year : "numeric",
    });
    const time = date.toLocaleTimeString(undefined,{
        hour : "2-digit",
        minute : "2-digit",
        second : "2-digit",
    })
    return {day, dmy, time};
}

