import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] | undefined;

  constructor(public employeeService: EmployeeService, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  form!: FormGroup;

  private buildForm() {
    this.form = this.formBuilder.group({
      _id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      position: ['', [Validators.required, Validators.minLength(3)]],
      office: ['', [Validators.required, Validators.minLength(3)]],
      salary: ['', [Validators.required, Validators.min(1)]],
    })
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      res => {
        this.employees = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  saveEmployee(event: Event): void {
    if (this.form.valid) {
      if (!this.form.value._id) {
        this.employeeService.createEmployee(this.form.value).subscribe(
          res => {
            Swal.fire(
              'Created!',
              'Your employee has been created.',
              'success'
            );
            this.getEmployees();
            this.form.reset();
          },
          err => {
            console.log(err);
          }
        )
      } else {
        this.employeeService.putEmployee(this.form.value).subscribe((res) => {
          Swal.fire(
            'Updated!',
            'Your employee has been updated.',
            'success'
          );
          this.getEmployees();
          this.form.reset();
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  deleteEmployee(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id).subscribe();
        Swal.fire(
          'Deleted!',
          'Your employee has been deleted.',
          'success'
        );
        this.getEmployees();
      }
    })
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
  }

  resetForm(event: Event) {
    this.form.reset();
  }

  get nameField() {
    return this.form.get('name');
  }

  get isNameFieldValid() {
    return this.nameField?.touched && this.nameField.valid;
  }

  get isNameFieldInvalid() {
    return this.nameField?.touched && this.nameField.invalid;
  }

  get positionField() {
    return this.form.get('position');
  }

  get isPositionFieldValid() {
    return this.form.get('position')?.touched && this.form.get('position')?.valid;
  }

  get isPositionFieldInvalid() {
    return this.form.get('position')?.touched && this.form.get('position')?.invalid;
  }

  get officeField() {
    return this.form.get('office');
  }

  get isOfficeFieldValid() {
    return this.officeField?.touched && this.officeField.valid;
  }

  get isOfficeFieldInvalid() {
    return this.officeField?.touched && this.officeField.invalid;
  }

  get salaryField() {
    return this.form.get('salary');
  }

  get isSalaryFieldValid() {
    return this.salaryField?.touched && this.salaryField.valid;
  }

  get isSalaryFieldInvalid() {
    return this.salaryField?.touched && this.salaryField.invalid;
  }

}
