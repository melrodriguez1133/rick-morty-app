import { Injectable } from '@angular/core';
import {
  LocalNotifications,
  PermissionStatus,
  ScheduleOptions
} from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /**
   * Solicita permiso para enviar notificaciones.
   */
  async requestPermission(): Promise<boolean> {

    const permission: PermissionStatus =
      await LocalNotifications.requestPermissions();

    return permission.display === 'granted';
  }

  /**
   * Verifica el estado actual del permiso.
   */
  async checkPermission(): Promise<boolean> {

    const permission: PermissionStatus =
      await LocalNotifications.checkPermissions();

    return permission.display === 'granted';
  }

  /**
   * Crea el canal de notificaciones para Android.
   */
  async createChannel(): Promise<void> {

    await LocalNotifications.createChannel({
      id: 'rick-morty',
      name: 'Rick & Morty',
      description: 'Notificaciones de Rick & Morty Explorer',
      importance: 5,
      visibility: 1,
      sound: 'default'
    });
  }

  /**
   * Programa las 3 notificaciones de prueba.
   */
  async scheduleTestNotifications(): Promise<void> {

    const now = new Date();

    const notification1 = new Date(
      now.getTime() + 5000
    );

    const notification2 = new Date(
      now.getTime() + 10000
    );

    const notification3 = new Date(
      now.getTime() + 15000
    );

    const options: ScheduleOptions = {
      notifications: [
        {
          id: 1001,
          title: 'Rick & Morty Explorer',
          body: '¡Notificación de prueba número 1!',
          channelId: 'rick-morty',
          schedule: {
            at: notification1
          }
        },
        {
          id: 1002,
          title: 'Rick & Morty Explorer',
          body: '¡Notificación de prueba número 2!',
          channelId: 'rick-morty',
          schedule: {
            at: notification2
          }
        },
        {
          id: 1003,
          title: 'Rick & Morty Explorer',
          body: '¡Notificación de prueba número 3!',
          channelId: 'rick-morty',
          schedule: {
            at: notification3
          }
        }
      ]
    };

    await LocalNotifications.schedule(options);
  }

  /**
   * Cancela las notificaciones de prueba.
   */
  async cancelTestNotifications(): Promise<void> {

    await LocalNotifications.cancel({
      notifications: [
        { id: 1001 },
        { id: 1002 },
        { id: 1003 }
      ]
    });
  }
}