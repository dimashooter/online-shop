import { Button } from '@mantine/core'
import { signIn, signOut, useSession } from 'next-auth/react'

export const Login = () => {

  const { data: session } = useSession()
  console.log(session);

  if (session) {
    return (
      <>
        <Button onClick={() => void signOut()}>
          sign out
        </Button>

      </>
    )
  } else {

    return (
      <Button onClick={() => void signIn()}>
        sign in
      </Button>
    )
  }
}


