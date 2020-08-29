import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { CSVRecord } from '../CSVModel';  
import { ClearpassService }  from '../clearpass.service'

@Component({
  selector: 'app-cargar',
  templateUrl: './cargar.component.html',
  styleUrls: ['./cargar.component.css']
})
export class CargarComponent implements OnInit {
  
  
  //uploader: FileUploader = new FileUploader({ url: "api/your_upload", removeAfterUpload: false, autoUpload: true });
  //direccionIP: string;
  //token: string;

  myForm = new FormGroup({
    direccionIP: new FormControl('', [Validators.required, Validators.minLength(7)]),
    token: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  

    
  constructor( public ClearpassService: ClearpassService, private http: HttpClient) { }
      
  get f(){
    return this.myForm.controls;
  }

     
  

  public records: any[] = [];  
  @ViewChild('csvReader') csvReader: any;  


  uploadListener($event: any): void {  
  
    let text = [];  
    let files = $event.srcElement.files;  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  

      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  

  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: CSVRecord = new CSVRecord();  
        csvRecord.mac_address = curruntRecord[0].trim();  
        csvArr.push(csvRecord);  
      }  
    }  
    return csvArr;  
    
  }  


  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  

  submit(){
  
    for (let j = 0; j < this.records.length; j++) {  
      console.log(this.records[j]);
     
      this.ClearpassService.registrarMac(this.myForm.get('direccionIP').value,this.myForm.get('token').value,this.records[j]);
    } 
    console.log('records' + this.records);

  }


  ngOnInit(): void {}


  }

 

