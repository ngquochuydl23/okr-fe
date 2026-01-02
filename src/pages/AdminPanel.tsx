import { Flex, Heading, Text, Button } from '@radix-ui/themes'

export default function AdminPanel() {
  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" align="center">
        <Heading size="8">Admin Panel</Heading>
      </Flex>
      
      <Text size="3" color="gray">Admin-only features and settings</Text>
      
      <Flex direction="column" gap="3" style={{ marginTop: '2rem' }}>
        <Button>Manage Users</Button>
        <Button>System Settings</Button>
        <Button>View Reports</Button>
      </Flex>
    </Flex>
  )
}
