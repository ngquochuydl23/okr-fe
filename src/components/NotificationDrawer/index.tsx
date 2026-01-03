import { Dialog, Flex, Box, Text, IconButton, ScrollArea, Badge } from "@radix-ui/themes";
import { IoClose } from "react-icons/io5";
import "./notification-drawer.scss";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type?: "info" | "success" | "warning" | "error";
}

interface NotificationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "OKR Update",
    message: "Your quarterly OKR has been approved by the manager",
    time: "2 hours ago",
    read: false,
    type: "success",
  },
  {
    id: "2",
    title: "Key Result Alert",
    message: "Key Result 'Increase revenue' is at risk",
    time: "5 hours ago",
    read: false,
    type: "warning",
  },
  {
    id: "3",
    title: "Team Invitation",
    message: "You have been invited to join 'Marketing Team'",
    time: "1 day ago",
    read: true,
    type: "info",
  },
  {
    id: "4",
    title: "Deadline Reminder",
    message: "OKR check-in deadline is tomorrow",
    time: "2 days ago",
    read: true,
    type: "warning",
  },
];

const NotificationDrawer = ({ open, onOpenChange }: NotificationDrawerProps) => {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const getNotificationColor = (type?: string) => {
    switch (type) {
      case "success":
        return "green";
      case "warning":
        return "orange";
      case "error":
        return "red";
      default:
        return "blue";
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="notification-drawer">
        <Flex direction="column" height="100%">
          <Flex justify="between" align="center" className="notification-drawer__header">
            <Flex align="center" gap="2">
              <Dialog.Title>Notifications</Dialog.Title>
              {unreadCount > 0 && (
                <Badge color="red" radius="full">
                  {unreadCount}
                </Badge>
              )}
            </Flex>
            <Dialog.Close>
              <IconButton variant="ghost" size="2">
                <IoClose size={20} />
              </IconButton>
            </Dialog.Close>
          </Flex>

          <ScrollArea className="notification-drawer__content">
            {mockNotifications.length === 0 ? (
              <Flex
                direction="column"
                align="center"
                justify="center"
                style={{ padding: "2rem", textAlign: "center" }}
              >
                <Text size="2" color="gray">
                  No notifications yet
                </Text>
              </Flex>
            ) : (
              <Flex direction="column" gap="2">
                {mockNotifications.map((notification) => (
                  <Box
                    key={notification.id}
                    className={`notification-item ${
                      notification.read ? "read" : "unread"
                    }`}
                  >
                    <Flex direction="column" gap="1">
                      <Flex justify="between" align="start">
                        <Text size="2" weight="bold">
                          {notification.title}
                        </Text>
                        {notification.type && (
                          <Badge
                            color={getNotificationColor(notification.type) as any}
                            size="1"
                          >
                            {notification.type}
                          </Badge>
                        )}
                      </Flex>
                      <Text size="2" color="gray">
                        {notification.message}
                      </Text>
                      <Text size="1" color="gray">
                        {notification.time}
                      </Text>
                    </Flex>
                  </Box>
                ))}
              </Flex>
            )}
          </ScrollArea>

          <Flex className="notification-drawer__footer" justify="center">
            <Text size="2" style={{ cursor: "pointer" }} className="view-all-link">
              View all notifications
            </Text>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default NotificationDrawer;
