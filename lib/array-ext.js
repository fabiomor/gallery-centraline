Array.prototype.unique = function(){
    for(var i = 0; i < this.length; i++){
        if( this.indexOf(this[i], i+1) != -1 ){
            this.splice(i,1);
            i--;
        }
    }
    return this;
}

function sortNumber(a, b) {
    return a - b;
}

function toDoubleDigit(n){
    return n > 9 ? "" + n: "0" + n;
}

function minutesOfDay(m){
    return m.minutes() + m.hours() * 60;
}