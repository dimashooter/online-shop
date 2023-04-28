import { Flex, Loader, Text } from '@mantine/core'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { Card } from '~/ui'
import { Modal } from '~/ui/Modal/Modal'
import { api } from '~/utils/api'

const Courses = () => {

  const user = useSession()

  const { data: courses, isLoading, } = api.courses.getAll.useQuery(undefined, {
    enabled: Boolean(user.data)
  })
  console.log(isLoading);

  if (isLoading && Boolean(user.data)) {
    return <Loader />
  }

  return (
    <div>
      <Head>
        <title>Manage Courses</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex justify='space-between' align='center' sx={() => ({
        marginBottom: "5em"
      })}>
        <Text size='lg'  >Maintain courses</Text>
        <Modal>

        </Modal>
      </Flex>
      <Flex
        gap="50px"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
      >
        {
          courses?.map(course => (
            <Card key={course.id} course={course} />
          ))
        }
      </Flex>

    </div>
  )
}

export default Courses
