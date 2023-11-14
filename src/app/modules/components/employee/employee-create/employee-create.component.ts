import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {

  addressList: FormGroup | null = null;

  output: string = '';

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addressList = this._formBuilder.group({
      address: this._formBuilder.array([this.createAddress])
    })
  }

  onSubmit(): void {
    debugger;
    this.output = this.addressList?.controls['address'].value;
    console.log(this.output);
  }

  addNewAddress(): void {
    debugger;
    (this.addressList?.get('address') as FormArray).push(this.createAddress);
  }

  get address(): FormArray {
    return (this.addressList?.get('address') || []) as FormArray;
  }

  private get createAddress(): FormGroup {
    return this._formBuilder.group({
      streetAddress: [],
      city: [],
      state: []
    })
  }

}
