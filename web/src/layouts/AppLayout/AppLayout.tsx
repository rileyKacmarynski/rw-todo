import { AttachmentIcon } from '@chakra-ui/icons'
import {
  Box,
  Container,
  Flex,
  Text,
  Spacer,
  ListItem,
  List,
  Link,
  HStack,
  VStack,
} from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { Link as RwLink, routes } from '@redwoodjs/router'

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { logOut, isAuthenticated } = useAuth()

  return (
    <>
      <Box as="nav" bg="blue.500" height={10} px={4}>
        <Container maxW={1400} height="100%">
          <Flex alignItems="center" height="100%">
            <Link
              _hover={{
                textDecoration: 'none',
              }}
              as={RwLink}
              to={routes.home()}
            >
              <Flex alignItems="center">
                <AttachmentIcon color="white" />
                <Text
                  textTransform="uppercase"
                  letterSpacing={2}
                  fontWeight={500}
                  fontSize="lg"
                  color="white"
                  ml={2}
                >
                  Todo
                </Text>
              </Flex>
            </Link>
            <Spacer />
            <List>
              {isAuthenticated ? (
                <Link as={RwLink} color="white" onClick={logOut}>
                  <ListItem>Logout</ListItem>
                </Link>
              ) : (
                <HStack spacing={4}>
                  <Link as={RwLink} color="white" to={routes.login()}>
                    <ListItem>Login</ListItem>
                  </Link>
                  <Link as={RwLink} color="white" to={routes.signup()}>
                    <ListItem>Signup</ListItem>
                  </Link>
                </HStack>
              )}
            </List>
          </Flex>
        </Container>
      </Box>
      <Container textAlign="left" maxW={1400} mt={8}>
        {children}
      </Container>
    </>
  )
}

export default AppLayout
