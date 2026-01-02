import { Flex, Heading, Text, Button, Card } from '@radix-ui/themes'

export default function Objectives() {
  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" align="center">
        <Heading size="8">Objectives</Heading>
        <Button>Create Objective</Button>
      </Flex>
      
      <Text size="3" color="gray">Manage your organizational objectives</Text>
      
      <Flex direction="column" gap="3" style={{ marginTop: '2rem' }}>
        <Card style={{ padding: '1.5rem' }}>
          <Heading size="4">Q1 2025 - Grow User Base</Heading>
          <Text size="2" color="gray" style={{ marginTop: '0.5rem' }}>
            Increase active users by 50%
          </Text>
        </Card>
        
        <Card style={{ padding: '1.5rem' }}>
          <Heading size="4">Q1 2025 - Improve Product Quality</Heading>
          <Text size="2" color="gray" style={{ marginTop: '0.5rem' }}>
            Reduce bug reports and improve user satisfaction
          </Text>
        </Card>
      </Flex>
    </Flex>
  )
}
