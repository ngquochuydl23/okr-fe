import { Flex, Heading, Text, Button } from '@radix-ui/themes'

export default function KeyResults() {
  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" align="center">
        <Heading size="8">Key Results</Heading>
        <Button>Add Key Result</Button>
      </Flex>
      
      <Text size="3" color="gray">Track your key results and progress</Text>
      
      <Flex direction="column" gap="3" style={{ marginTop: '2rem' }}>
        <Text>Key results will be displayed here...</Text>
      </Flex>
    </Flex>
  )
}
