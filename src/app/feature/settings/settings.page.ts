import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonText
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  notificationsOutline,
  checkmarkCircleOutline,
  informationCircleOutline,
  notificationsOffOutline
} from 'ionicons/icons';

import { NotificationService } from '../../core/services/notification/notification.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonText
  ]
})
export class SettingsPage implements OnInit {

  notificationsEnabled = false;
  loading = false;
  testSent = false;

  constructor(
    private notificationService: NotificationService
  ) {

    addIcons({
      notificationsOutline,
      checkmarkCircleOutline,
      informationCircleOutline,
      notificationsOffOutline
    });

  }

  async ngOnInit(): Promise<void> {

    await this.checkNotifications();

  }

  /**
   * Verifica si las notificaciones están permitidas.
   */
  async checkNotifications(): Promise<void> {

    try {

      this.notificationsEnabled =
        await this.notificationService.checkPermission();

    } catch (error) {

      console.error(
        'Error verificando permisos:',
        error
      );

      this.notificationsEnabled = false;
    }
  }

  /**
   * Activa las notificaciones.
   */
  async enableNotifications(): Promise<void> {

    if (this.loading) {
      return;
    }

    this.loading = true;
    this.testSent = false;

    try {

      const granted =
        await this.notificationService.requestPermission();

      if (!granted) {

        this.notificationsEnabled = false;

        console.warn(
          'El usuario no permitió las notificaciones.'
        );

        return;
      }

      this.notificationsEnabled = true;

      await this.notificationService.createChannel();

      await this.notificationService.scheduleTestNotifications();

      this.testSent = true;

      console.log(
        '3 notificaciones de prueba programadas.'
      );

    } catch (error) {

      console.error(
        'Error activando notificaciones:',
        error
      );

      this.notificationsEnabled = false;

    } finally {

      this.loading = false;

    }
  }

  /**
   * Programa nuevamente las notificaciones
   * para realizar otra prueba.
   */
  async sendTestNotifications(): Promise<void> {

    if (!this.notificationsEnabled) {
      return;
    }

    this.loading = true;
    this.testSent = false;

    try {

      await this.notificationService.scheduleTestNotifications();

      this.testSent = true;

    } catch (error) {

      console.error(
        'Error enviando notificaciones:',
        error
      );

    } finally {

      this.loading = false;

    }
  }

  /**
   * Cancela las notificaciones de prueba.
   */
  async cancelNotifications(): Promise<void> {

    try {

      await this.notificationService.cancelTestNotifications();

      this.testSent = false;

      console.log(
        'Notificaciones de prueba canceladas.'
      );

    } catch (error) {

      console.error(
        'Error cancelando notificaciones:',
        error
      );
    }
  }
}