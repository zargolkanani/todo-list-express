// تابع تبدیل میلادی به شمسی
function gregorianToJalali(gy, gm, gd) {
    var g_d_m, jy, jm, jd;
    g_d_m = [0,31,59,90,120,151,181,212,243,273,304,334];
    if(gy > 1600){
        jy=979;
        gy-=1600;
    } else {
        jy=0;
        gy-=621;
    }
    var gy2 = (gm>2)?(gy+1):gy;
    var days = 365*gy + parseInt((gy2+3)/4) - parseInt((gy2+99)/100) + parseInt((gy2+399)/400) - 80 + gd + g_d_m[gm-1];
    jy += 33 * parseInt(days/12053);
    days %= 12053;
    jy += 4 * parseInt(days/1461);
    days %= 1461;
    if(days > 365){
        jy += parseInt((days-1)/365);
        days = (days-1)%365;
    }
    if(days < 186){
        jm = 1 + parseInt(days/31);
        jd = 1 + days%31;
    } else {
        jm = 7 + parseInt((days-186)/30);
        jd = 1 + (days-186)%30;
    }
    return [jy, jm, jd];
}

// نمایش تاریخ شمسی به صورت سال/ماه/روز
function showShamsiDate() {
    const today = new Date();
    const [jy, jm, jd] = gregorianToJalali(today.getFullYear(), today.getMonth()+1, today.getDate());
    // نمایش استاندارد فارسی: سال / ماه / روز
    document.getElementById('shamsi-date').textContent = `${jy}/${jm.toString().padStart(2,'0')}/${jd.toString().padStart(2,'0')}`;
}

// اجرا
showShamsiDate();
