
export function formatDate (i: Date, format?: string):string {
    // debugger;
    return i.toString();//i.getFullYear && i.getFullYear() + "-" + (i.getMonth() + 1) + "-" + i.getDate() + " " + i.getHours() + ":" + i.getMinutes() + ":" + i.getSeconds();
}
