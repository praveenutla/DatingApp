import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-photos-edit',
  templateUrl: './photos-edit.component.html',
  styleUrls: ['./photos-edit.component.css']
})
export class PhotosEditComponent implements OnInit {

  @Input() photos: Photo[];
  @Output() getMainPhotoUrl = new EventEmitter<string>();
  baseurl = environment.apiUrl;
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  currentPhoto : Photo;
  
  constructor(private authService: AuthService,private userService: UserService, private alertify:AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseurl+'user/'+this.authService.decodeToken.nameid+'/photos',
      authToken: 'Bearer '+ localStorage.getItem('token'),
      isHTML5: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
      removeAfterUpload: true,
      allowedFileType: ['image']
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onSuccessItem = (file, response) => {
      if(response){
        const resp : Photo = JSON.parse(response);
      this.photos.push(resp);
      }
    }
  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo){
    this.userService.setMainPhoto(this.authService.decodeToken.nameid, photo.id).subscribe(
      resp =>{
        this.getMainPhotoUrl.emit(photo.url);
        this.currentPhoto = this.photos.filter(p => p.isMain === true)[0];
        this.currentPhoto.isMain = false;
        photo.isMain = true;
        this.authService.changeMemberPhoto(photo.url);
        this.authService.currentuser.photoUrl = photo.url;
        localStorage.setItem('user',JSON.stringify(this.authService.currentuser));
      },
      error => {
        this.alertify.error(error);
      }
    )
  }

  deletePhoto(id: number){
    this.userService.deletePhoto(this.authService.decodeToken.nameid, id).subscribe(
      () => {
        this.alertify.success('Photo has been deleted');
        this.photos.splice(this.photos.findIndex(p => p.id == id),1);
      },
      error => {
        this.alertify.error(error);
      }
    )
  }

}
