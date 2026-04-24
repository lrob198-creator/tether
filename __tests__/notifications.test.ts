import { notificationStorage } from '../lib/notifications';

describe('notificationStorage', () => {
  beforeEach(() => {
    // Clear all notifications before each test
    sessionStorage.clear();
  });

  test('should add and retrieve notifications', () => {
    const userId = 'test-user';
    const notification = {
      userId,
      type: 'profile_reminder' as const,
      title: 'Test Notification',
      message: 'This is a test',
    };

    notificationStorage.addNotification(userId, notification);
    const notifications = notificationStorage.getNotifications(userId);

    expect(notifications).toHaveLength(1);
    expect(notifications[0].title).toBe('Test Notification');
    expect(notifications[0].isRead).toBe(false);
  });

  test('should mark notifications as read', () => {
    const userId = 'test-user';
    const notification = {
      userId,
      type: 'profile_reminder' as const,
      title: 'Test Notification',
      message: 'This is a test',
    };

    notificationStorage.addNotification(userId, notification);
    const notifications = notificationStorage.getNotifications(userId);
    const notificationId = notifications[0].id;

    notificationStorage.markAsRead(userId, notificationId);
    const updatedNotifications = notificationStorage.getNotifications(userId);

    expect(updatedNotifications[0].isRead).toBe(true);
  });

  test('should get unread count', () => {
    const userId = 'test-user';
    const notification1 = {
      userId,
      type: 'profile_reminder' as const,
      title: 'Test 1',
      message: 'Test 1',
    };
    const notification2 = {
      userId,
      type: 'profile_reminder' as const,
      title: 'Test 2',
      message: 'Test 2',
    };

    notificationStorage.addNotification(userId, notification1);
    notificationStorage.addNotification(userId, notification2);

    expect(notificationStorage.getUnreadCount(userId)).toBe(2);

    const notifications = notificationStorage.getNotifications(userId);
    notificationStorage.markAsRead(userId, notifications[0].id);

    expect(notificationStorage.getUnreadCount(userId)).toBe(1);
  });
});