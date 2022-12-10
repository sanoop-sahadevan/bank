import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUsername:any
  currentAcno:any
  database:any={
    1000:{acno:1000,uname:"Neer",password:1000,balance:5000,transaction:[]},
    1001:{acno:1001,uname:"Laisha",password:1001,balance:2000,transaction:[]},
    1002:{acno:1002,uname:"Vyom",password:1002,balance:4000,transaction:[]},
    1003:{acno:1003,uname:"Mathew",password:1003,balance:1000,transaction:[]}
  
  }

  constructor() {
    this.getDetails( )
   }

  //save data in local storage
  saveDetails(){
    localStorage.setItem("database",JSON.stringify(this.database))
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
    if(this.currentUsername){
      localStorage.setItem("currentUsername",JSON.stringify(this.currentUsername))
    }

  }

  //get data local storage
  getDetails(){
    if(localStorage.getItem("database")){
      this.database=JSON.parse(localStorage.getItem("database")||"")
    }
    if(localStorage.getItem("currentAcno")){
      this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")||"")
    }
    if(localStorage.getItem("currentUsername")){
      this.currentUsername=JSON.parse(localStorage.getItem("currentUsername")||"")
    }
  }

  //register
  register(acno:any,password:any,uname:any){
    let database=this.database
    if(acno in database){
      //acno already exsisting
      return false

    }
    else{
      database[acno]={
        acno,
        uname,
        password,
        balance:0,
        transaction:[]
      }
      this.saveDetails()
      console.log(database);
      
      return true
    }


  }

//login
login(acno:any,pswd:any){
 
  let database=this.database
  
  if(acno in database){
// acno match
    if(pswd==database[acno]["password"]){
      this.currentUsername=database[acno]["uname"]
      this.currentAcno=acno
      //pswd match
      this.saveDetails()
      return true
      
    }
    else{
      alert("Incorrect password")
      return false
    }
  }
  else{
// not exist
    alert("Account does not exist")
    return false
  }
}
deposit(acno:any,pswd:any,amt:any){
  var amount=parseInt(amt)
  let database=this.database
  if(acno in database){
    if(pswd==database[acno]["password"]){
      database[acno]["balance"]+=amount
      database[acno]["transaction"].push({
        type:"CREDIT",
        amount:amount
      })
      console.log(database);
      this.saveDetails()
      return database[acno]["balance"]
    }
    else{
      alert("Incorrect Password")
      return false
    }
  }
  else{
    alert("Account does not exist")
    return false
  }
}
withdraw(acno:any,pswd:any,amt:any){
  var amount=parseInt(amt)
  let database=this.database
  if(acno in database){
    if(pswd==database[acno]["password"]){
      if(database[acno]["balance"]>amount){
        database[acno]["balance"]-=amount
        database[acno]["transaction"].push({
          type:"DEBIT",
          amount:amount
        })
        console.log(database);
        this.saveDetails()
        
      return database[acno]["balance"]
      }
      else{
        alert("Insufficient balance")
        return false
      }
    }
    else{
      alert("Incorrect Password")
      return false
    }
  }
  else{
    alert("Account does not exist")
    return false
  }
}
getTransaction(acno:any){
return this.database[acno]["transaction"]
}



}
