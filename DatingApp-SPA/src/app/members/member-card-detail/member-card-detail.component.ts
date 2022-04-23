import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-card-detail',
  templateUrl: './member-card-detail.component.html',
  styleUrls: ['./member-card-detail.component.css'],
})
export class MemberCardDetailComponent implements OnInit {

  user: User ;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService
  ) {
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        thumbnailsColumns: 4,
        imagePercent: 100,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

  }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.user = data['user'];
    })
    this.galleryImages = this.getPhotos();
  }

  getPhotos(): {small: string, medium:string, large:string}[]{
    const imageUrls: {small: string, medium:string, large:string}[] = [];
    const photos = this.user.photos??[];
    for (const photo of photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        large: photo.url
      });
    }
    return imageUrls;
  }

  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe(
  //       (resp: User) => {
  //         this.user = resp;
  //       },
  //       (error) => {
  //         this.alertify.error(error);
  //       }
  //     );
  // }
}
