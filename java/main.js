// let password = 'hhh-';
// if (password.length >= 4 && (password.includes('_') || password.includes('-'))) {
//     console.log('Пароль заебись');
// }
// else { console.log('Пароль хуйня, переделывай'); };

// let firstName = "Vasy";
// let surname = "Popttov";
// let firstChar = "";
// let otherChars = "";

// firstChar = firstName.substring(0, 1);
// otherChars = firstName.substring(1);
// let fullFirstName = firstChar.toUpperCase() + otherChars.toLowerCase();


// firstChar = surname.substring(0, 1);
// otherChars = surname.substring(1);
// let fullSurname = firstChar.toUpperCase() + otherChars.toLowerCase();


// console.log("Полное имя:  " + (fullFirstName) + " " + (fullSurname));

// if (firstName === fullFirstName && surname === fullSurname) {
//     console.log("Имя введеено грамотно");
// } else { console.log("Имя введено  неграмотно"); };








// заполнееение массивов рандомными числами
// let n = 0;
// let m = -100;
// let count =100;

// let array = [];


// for (i = 0; i < count; i++){
//     array.push(Math.round((Math.random() * m) + n));
// };
// console.log(array);








// задача с  реврсом строки

// let str = "Привет, мир!";
// let strRev = "";
// count = str.length;
// let a = [];
// for (i = 0; i < count; i++){
//     a.unshift(str[i]);

// }
// for (i = 0; i < count; i++){
//     strRev += a[i];
// }
// console.log(strRev)









//  задача с танком
// let roadMines = [true, false, false, false, false, false, false, false, false, true];
// let count = 0;
// for (i = 0  ; i < roadMines.length; i++){
//     console.log('Танк переместился на  $(i + 1)');
//     if (roadMines[i] == 1) {
//         count++;
//         if (count < 2) {
//             console.log("Танк поврежден");
//         }
//         else { console.log("Танк уничтожен"); break}
//     }
// }









// задача с днями недели

let startDay = 'среда';
let month = [];
for (i = 1; i < 32; i++) { month.push(i); };
console.log(month);
let days = ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"];
let y = 0;
for (i in days) {
    if (startDay.includes(days[i])) {
       y = i;
    }
};
for (i in month) {
    d = (i + y) % 7;
    console.log(month[i] + ' jan ' + days[d]);
};


// for (i = 0, z = day; i < month.length; i++, z++){
//     if (z > days.length - 1) { z = 0 };
//     console.log(month[i] +' января ' + days[z]);
// }



























