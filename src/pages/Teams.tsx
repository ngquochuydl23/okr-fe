import { Flex, Heading, Text, Button } from '@radix-ui/themes'

export default function Teams() {
  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" align="center">
        <Heading size="8">Teams</Heading>
        <Button>Add Team</Button>
      </Flex>
      
      <Text size="3" color="gray">Manage teams and members</Text>
      
      <Flex direction="column" gap="3" style={{ marginTop: '2rem' }}>
        <Text>Teams will be displayed here...</Text>
      </Flex>
    </Flex>
  )
}
