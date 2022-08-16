import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  files: Set<File>;

  constructor(
    private uploadFileService: UploadFileService
  ) { }

  ngOnInit(): void {
  }

  onChange(event: any){
    const selectedFile = <FileList>event.srcElement.files;
    const fileNames = [];
    this.files = new Set();

    for(let i = 0; i < selectedFile.length; i++) {
      fileNames.push(selectedFile[i].name);
      this.files.add(selectedFile[i]);
    }
    const uploadNames = <HTMLElement>document.querySelector('.uploadNames');
    uploadNames.innerHTML = fileNames.join(', ');
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.uploadFileService.upload(this.files, 'http://localhost:8000/upload')
        .subscribe(data => console.log(data))
    }
  }

}
