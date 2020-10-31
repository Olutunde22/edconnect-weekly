const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
        this. id = id
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.password = password
        this.matricNumber = matricNumber
        this.program = program
        this.graduationYear = graduationYear
    }

    getFullName() {
        let fullname = this.firstname + " " + this.lastname;
        return fullname;
    }
}

class Users extends DataModel {
    authenticate(email, password) {
        const allData = this.getAll();
        for (let i = 0; i < allData.length; i++) {
            if (allData[i].email === email && allData[i].password === password){
                return true
            }
        }
        return false
    }
 
    getByEmail(email) {
        const allData = this.getAll();
        for (let i = 0; i < allData.length; i++) {
            if (allData[i].email === email){
                return allData[i]
            }
            else{
                return null
         }
        }
    }

    getByMatricNumber(matricNumber) {
        const allData = this.getAll();
        for (let i = 0; i < allData.length; i++) {
            if (allData[i].matricNumber === matricNumber){
                return allData[i]
            }
            else{
                return null
         }
        }
    }

    validate(obj) {
        const allData = this.getAll();
        for (let i = 0; i < allData.length; i++) {
          if (obj.email === "" ||
          obj.password === "" ||
          obj.firstname === "" ||
          obj.lastname === "" ||
          obj.matricNumber === "" ||
          obj.program === "" ||
          obj.graduationYear === "" ||
          obj.password.length < 7 ||
          allData[i].email === obj.email ||
          allData[i].matricNumber === obj.matricNumber)
            return false;
        }
        return true;
      }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};