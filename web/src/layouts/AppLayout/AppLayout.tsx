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
  Button,
} from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { Link as RwLink, routes } from '@redwoodjs/router'

import ListsCell from 'src/components/ListsCell'

type AppLayoutProps = {
  children?: React.ReactNode
}

interface NavProps {
  logout: () => Promise<unknown>
  isAuthenticated: boolean
}

const Nav: React.FC<NavProps> = ({ isAuthenticated, logout }) => {
  return (
    <Box as="nav" bg="blue.500" height={12} px={4}>
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
              <Button
                variant="link"
                as={RwLink}
                color="white"
                onClick={logout}
                to={''}
              >
                <ListItem>Logout</ListItem>
              </Button>
            ) : (
              <HStack spacing={4}>
                <Button
                  variant="link"
                  as={RwLink}
                  color="white"
                  to={routes.login()}
                >
                  <ListItem>Login</ListItem>
                </Button>
                <Button
                  variant="link"
                  as={RwLink}
                  color="white"
                  to={routes.signup()}
                >
                  <ListItem>Signup</ListItem>
                </Button>
              </HStack>
            )}
          </List>
        </Flex>
      </Container>
    </Box>
  )
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { logOut, isAuthenticated } = useAuth()

  return (
    <>
      <Nav isAuthenticated={isAuthenticated} logout={logOut} />
      <HStack alignItems="start" height="calc(100vh - 3rem)">
        <Box
          height="100%"
          width="clamp(240px, 20%, 400px)"
          backgroundColor="gray.100"
        >
          <ListsCell />
        </Box>
        <Container pt={4} textAlign="left" maxW={1400}>
          {children}
        </Container>
      </HStack>
    </>
  )
}

export default AppLayout
