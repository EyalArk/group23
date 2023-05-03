function person (first,last,DOB){
    this.first = first;
    this.last = last;
    this.DOB = DOB;
}

const person1 = new person('moti','levi', '1.1.1995' )

console.log(person1)
