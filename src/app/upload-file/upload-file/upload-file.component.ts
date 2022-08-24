import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators.';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  files: Set<File>;
  progress = 0;

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
    this.progress = 0;
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.uploadFileService.upload(this.files, '/api/upload')
        .pipe(
          uploadProgress(progress => this.progress = progress),
          filterResponse()
        )
        .subscribe(response => console.log('Concluido'));

        // .subscribe((event: HttpEvent<Object>) => {
        //   if(event.type === HttpEventType.Response){
        //     console.log('Concluido');
        //   }else if(event.type === HttpEventType.UploadProgress){
        //     if(event.total){
        //       const percentDone = Math.round((event.loaded * 100) / event.total);
        //       this.progress = percentDone;
        //     }
        //   }
        // })
    }
  }

}
