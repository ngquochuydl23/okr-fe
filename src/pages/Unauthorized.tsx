import { Flex, Heading, Text, Button, Callout } from '@radix-ui/themes'
import { useNavigate } from 'react-router-dom'

export default function Unauthorized() {
  const navigate = useNavigate()

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="4"
      style={{ minHeight: '100vh', padding: '2rem' }}
    >
      <Callout.Root color="red" size="3" style={{ maxWidth: '500px' }}>
        <Callout.Icon>
          <svg
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.5551 0.608766L0.18819 11.3368C-0.2494 12.0676 0.2774 13 1.1331 13H13.8669C14.7226 13 15.2494 12.0676 14.8118 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9528 11.8488C13.992 11.9148 13.9456 12 13.8669 12H1.1331C1.0544 12 1.008 11.9148 1.0472 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18779 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </Callout.Icon>
        <Callout.Text>
          <Heading size="5" style={{ marginBottom: '0.5rem' }}>
            403 - Access Denied
          </Heading>
          <Text size="2">
            You don't have permission to access this page. Please contact your administrator if
            you believe this is an error.
          </Text>
        </Callout.Text>
      </Callout.Root>

      <Flex gap="3" style={{ marginTop: '1rem' }}>
        <Button onClick={() => navigate(-1)} variant="soft">
          Go Back
        </Button>
        <Button onClick={() => navigate('/')}>Go to Dashboard</Button>
      </Flex>
    </Flex>
  )
}
