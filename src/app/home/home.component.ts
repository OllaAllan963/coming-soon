import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';
import AOS from 'aos';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, FormsModule, NgClass, ReactiveFormsModule, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  //start variables
  logo: string = "assets/images/logo.png"
  subscriptionForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  mainColor: string = "#ec1c23";
  //end

  ngOnInit(): void {
    AOS.init({
      duration: 800,
      once: true
    });
  }

  constructor(private fb: FormBuilder) {
    this.subscriptionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.subscriptionForm.get('email')!;
  }

  onSubmit() {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.subscriptionForm.invalid) return;

    const emailValue = this.subscriptionForm.value.email;

    const templateParams = {
      from_email: emailValue
    };

    emailjs.send(
      'service_c9a24ap',     // e.g., 'gmail'
      'template_r964qec',    // e.g., 'template_abc123'
      templateParams,
      'FPo9AMkiKW0CLZPtN'      // e.g., 'user_abcXYZ'
    ).then(
      () => {
        this.successMessage = 'Thank you for subscribing!';
        this.subscriptionForm.reset();
        this.submitted = false;

        // Automatically hide success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 8000);

      },
      (error) => {
        console.error('EmailJS error:', error);
        this.errorMessage = 'Something went wrong. Please try again later.';

        // Automatically hide error message after 3 seconds
        setTimeout(() => {
          this.errorMessage = '';
        }, 8000);
      }
    );
  }
}
