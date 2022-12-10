import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  //Depositform
  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern("[0-9]*")]],
    pswd: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 ]*")]],
    amount: ['', [Validators.required, Validators.pattern("[0-9 ]*")]]

  })

  //withdrawform
  withdrawForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern("[0-9]*")]],
    pswd: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 ]*")]],
    amount: ['', [Validators.required, Validators.pattern("[0-9 ]*")]]

  })

  user:any
  loginDate:any


  constructor(private ds: DataService, private fb: FormBuilder,private router:Router) { 
  this.user=this.ds.currentUsername
  this.loginDate=new Date()
}
  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
      alert("Please Log In...")
      this.router.navigateByUrl("")
    }
  }

  deposit() {
    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount
    if (this.depositForm.valid) {
      //call deposit in data service
      const result = this.ds.deposit(acno, pswd, amount)
      if (result) {
        alert(amount + "Deposited successfully and new balance is:" + result)
      }
    }
    else {
      alert("Invalid Form")
    }

  }

  withdraw() {
    var acno = this.withdrawForm.value.acno
    var pswd = this.withdrawForm.value.pswd
    var amount = this.withdrawForm.value.amount
    if (this.withdrawForm.valid) {
      //call deposit in data service
      const result = this.ds.withdraw(acno, pswd, amount)
      if (result) {
        alert(amount + "Debited successfully and new balance is:" + result)
      }
    }
    else {
      alert("Invalid Form")
    }


  }

  //logout
  logout(){
    localStorage.removeItem("currentUsername")
    localStorage.removeItem("currenyAcno")
    this.router.navigateByUrl("")
  }

}
