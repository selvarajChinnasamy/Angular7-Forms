import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  addForm: FormGroup;
  formSubmitted: Boolean;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formSubmitted = false;
    this.addForm = this.createAddForm();
  }
  createAddForm(): FormGroup {
    return this.formBuilder.group({
      pledgeNoIndex: [null, [Validators.required]],
      pledgeNoValue: [null, [Validators.required]],
      settlementDetails: ['View Settlement Details', []],
      totalPiece: [null, [Validators.required]],
      totalGross: [null, [Validators.required]],
      totalStone: [null, [Validators.required]],
      totalNet: [null, [Validators.required]],
      totalNetScheme: [null, [Validators.required]],
      inventory: ['Swarna Mithra'],
      settletementValue: [null, [Validators.required]],
      eligibleValue: [null, [Validators.required]],
      pledgeValue: [null, [Validators.required]],
      netAmount: [null, [Validators.required]],
      customerName: [null, [Validators.required]],
      purpose: ['Auto Loan'],
      paymentTneft: [null],
      paymentTcash: [null],
      itemsTable: this.formBuilder.array([this.dynamicTableInputs()]),
    });
  }
  dynamicTableInputs(): FormGroup {
    return this.formBuilder.group({
      itemName: [null],
      ItemCount: [null],
      deductionName: [null],
      grossWt: [null],
      stoneWt: [null],
      stdWt: [null],
      remarks: [null],
    });
  }
  get itemsTable(): FormArray {
    return <FormArray>this.addForm.get('itemsTable');
  }
  addItem(): void {
    this.itemsTable.push(this.dynamicTableInputs());
  }
  onSubmit(): void {
    this.formSubmitted = true;
    if (!this.addForm.controls['paymentTneft'].value && !this.addForm.controls['paymentTcash'].value) {
      this.addForm.controls['paymentTneft'].setErrors({ error: true, message: 'AtLeast one Payment Type is Required' });
    } else {
      this.addForm.controls['paymentTneft'].setErrors(null);
    }
    if (this.addForm.invalid) { return; }
    console.log(this.addForm.value);
  }
  resetForm(): void {
    this.formSubmitted = false;
    this.addForm.reset();
  }
}



