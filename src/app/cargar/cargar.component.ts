import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-cargar',
  templateUrl: './cargar.component.html',
  styleUrls: ['./cargar.component.css']
})
export class CargarComponent implements OnInit {
  
  

  myForm = new FormGroup({
    direccionIP: new FormControl('', [Validators.required, Validators.minLength(7)]),
    token: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
    
  constructor(private http: HttpClient) { }
      
  get f(){
    return this.myForm.controls;
  }
     
  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }
     
  submit(){
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource').value);
   
    this.http.post('http://localhost:8001/upload.php', formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }
  

  ngOnInit(): void {}


  }

 

