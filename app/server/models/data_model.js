class DataModel {
    constructor() {
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        const allData = this.getAll();
        for (let i = 0; i < allData.length; i++) {
            if (allData[i].id === id){
                return allData[i]
            }
            else{
                return null
        }     
    }
}
    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
        const allData = this.getAll();
        for (let i = 0; i < allData.length; i++) {
            if (allData[i].id === id){   
                if(obj.firstname && obj.firstname.length > 0){
                    allData[i].firstname = obj.firstname
                } if(obj.lastname && obj.lastname.length > 0){
                    allData[i].lastname = obj.lastname
                } if(obj.email && obj.email.length > 0){
                    allData[i].email = obj.email
                } if(obj.password && obj.password.length > 0){
                    allData[i].password = obj.password
                } if(obj.matricNumber && obj.matricNumber.length > 0){
                    allData[i].matricNumber = obj.matricNumber
                } if(obj.program && obj.program.length > 0){
                    allData[i].program = obj.program
                } if(obj.graduationYear && obj.graduationYear.length > 0){
                    allData[i].graduationYear = obj.graduationYear
                } if(obj.name && obj.name.length > 0){
                    allData[i].name = obj.name
                } if(obj.abstract && obj.abstract.length > 0 ){
                    allData[i].abstract = obj.abstract
                } if(obj.authors && obj.authors.length > 0){
                    allData[i].authors = obj.authors
                }if(obj.tags && obj.tags.length > 0){
                    allData[i].tags = obj.tags
                }if(obj.createdBy && obj.createdBy.length > 0){
                    allData[i].createdBy = obj.createdBy
                }
                return true
            }
            else{
                return false
          }
        }
    }

    delete(id) {
        if(id){
            const allData = this.getAll();
            for (let i = 0; i < allData.length; i++) {
                if (allData[i].id === id){
                    [allData[i] , allData[allData.length - 1] = allData[allData.length - 1] , allData[i] ]
                    allData.pop()
                    return true;
                }
            }
        } else{
            return  false;
        }
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;