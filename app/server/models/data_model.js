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
                    return true
                } if(obj.lastname && obj.lastname.length > 0){
                    allData[i].lastname = obj.lastname
                    return true
                } if(obj.email && obj.email.length > 0){
                    allData[i].email = obj.email
                    return true
                } if(obj.password && obj.password.length > 0){
                    allData[i].password = obj.password
                    return true
                } if(obj.matricNumber && obj.matricNumber.length > 0){
                    allData[i].matricNumber = obj.matricNumber
                    return true
                } if(obj.program && obj.program.length > 0){
                    allData[i].program = obj.program
                    return true
                } if(obj.graduationYear && obj.graduationYear.length > 0){
                    allData[i].graduationYear = obj.graduationYear
                    return true
                } if(obj.name && obj.name.length > 0){
                    allData[i].name = obj.name
                    return true
                } if(obj.abstract && obj.abstract.length > 0 ){
                    allData[i].abstract = obj.abstract
                    return true
                } if(obj.authors && obj.authors.length > 0){
                    allData[i].authors = obj.authors
                    console.log(obj.tags)
                    return true
                }if(obj.tags && obj.tags.length > 0){
                    allData[i].tags = obj.tags
                    return true
                }if(obj.createdBy && obj.createdBy.length > 0){
                    allData[i].createdBy = obj.createdBy
                    return true
                }
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
                    allData[i] = allData[allData.length - 1]
                    allData.pop()
                    return true;
                }
            }
        } else{
            return  null
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