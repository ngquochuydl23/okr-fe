import { Flex, Heading, Text } from '@radix-ui/themes'

export default function Settings() {
  return (
    <Flex direction="column" gap="4">
      <Heading size="8">Settings</Heading>
      <Text size="3" color="gray">Configure your preferences</Text>
      
      <Flex direction="column" gap="3" style={{ marginTop: '2rem' }}>
        <Text>Settings options will be displayed here...</Text>
      </Flex>
    </Flex>
  )
}
