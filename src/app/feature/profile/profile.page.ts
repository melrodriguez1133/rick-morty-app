import {
  Component,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  IonContent,
  IonIcon,
  IonButton,
  IonInput,
  IonTextarea
} from '@ionic/angular';

import {
  personOutline,
  atOutline,
  mailOutline,
  chatbubbleOutline,
  saveOutline
} from 'ionicons/icons';

import {
  addIcons
} from 'ionicons';

import {LocalStorageService} from '../../core/services/local-storage';

import {
  ProfileModel
} from '../../core/models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    IonContent,
    IonIcon,
    IonButton,
    IonInput,
    IonTextarea
  ]
})
export class ProfilePage {

  profile: ProfileModel = {
    name: '',
    username: '',
    email: '',
    icon: '🧪',
    message: ''
  };


  constructor(
    private localStorageService: LocalStorageService,
    private cdr: ChangeDetectorRef
  ) {

    addIcons({
      personOutline,
      atOutline,
      mailOutline,
      chatbubbleOutline,
      saveOutline
    });

  }


  ionViewWillEnter(): void {

    this.loadProfile();

  }


  // =========================
  // CARGAR PERFIL
  // =========================

  loadProfile(): void {

    const savedProfile =
      this.localStorageService.getProfile();


    if (savedProfile) {

      this.profile = {
        ...savedProfile
      };

    }


    this.cdr.detectChanges();

  }


  // =========================
  // GUARDAR PERFIL
  // =========================

  saveProfile(): void {

    this.localStorageService.saveProfile(
      this.profile
    );

    console.log(
      'Perfil guardado:',
      this.profile
    );

  }

}