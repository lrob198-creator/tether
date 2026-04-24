import { Notification } from './types';

export const notificationStorage = {
  getNotifications: (userId: string): Notification[] => {
    const stored = sessionStorage.getItem(`notifications_${userId}`);
    return stored ? JSON.parse(stored) : [];
  },

  addNotification: (userId: string, notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>): void => {
    const notifications = notificationStorage.getNotifications(userId);
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      isRead: false,
      createdAt: new Date(),
    };
    notifications.unshift(newNotification); // Add to beginning
    sessionStorage.setItem(`notifications_${userId}`, JSON.stringify(notifications));
  },

  markAsRead: (userId: string, notificationId: string): void => {
    const notifications = notificationStorage.getNotifications(userId);
    const updated = notifications.map(n =>
      n.id === notificationId ? { ...n, isRead: true } : n
    );
    sessionStorage.setItem(`notifications_${userId}`, JSON.stringify(updated));
  },

  markAllAsRead: (userId: string): void => {
    const notifications = notificationStorage.getNotifications(userId);
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    sessionStorage.setItem(`notifications_${userId}`, JSON.stringify(updated));
  },

  getUnreadCount: (userId: string): number => {
    const notifications = notificationStorage.getNotifications(userId);
    return notifications.filter(n => !n.isRead).length;
  },

  clearAll: (userId: string): void => {
    sessionStorage.removeItem(`notifications_${userId}`);
  },
};