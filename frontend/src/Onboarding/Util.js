export default function DateToDBDate(date) {
    //Input format: YYYY-MM-DD
    //DB format: MM-YYYY
    console.log(date);
    var month, day, year;
    if(date.length == 10) {
        month = date.substring(5,7);
        day = date.substring(8);
        year = date.substring(0, 4);
    }
    
    return date.length == 10 ? `${month}-${year}` : '';
}