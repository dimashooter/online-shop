import { Button, Flex, Loader, Stack, Text } from '@mantine/core'
import { IconEdit } from '@tabler/icons-react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import EditCourse from '~/features/EditCourse/EditCourse'
import { api } from '~/utils/api'

const FullCourse = () => {

  const router = useRouter()

  const [isEdit, setIsEdit] = useState(false)

  const closeEdit = useCallback(() => {
    setIsEdit(false)
  }, [])
  const openEdit = useCallback(() => {
    setIsEdit(true)
  }, [])
  const id = router.query.id as string

  const { data: course, isLoading, refetch } = api.courses.getOne.useQuery({ courseId: id }, {
    enabled: !!id,
    onSuccess: () => {
      toast.success("Data success loaded!")
    }
  })

  if (!id) {
    return null
  }

  if (isLoading) {
    return (
      <Flex justify='center' p='lg' >
        <Loader size={48} color='teal' />
      </Flex>
    )
  }

  return (
    <>
      <Head>
        <title>Course page</title>
      </Head>
      {
        isEdit ?
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px'
          }}>
            <EditCourse id={id} close={closeEdit} title={course?.title} refetch={refetch}
              description={course?.description} />
            <Button>
              <IconEdit onClick={closeEdit} />
            </Button>

          </div>
          :
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px'
          }}>
            <Stack>
              <Text size='lg'>
                {course?.title}
              </Text>
              <Text size='sm' color='teal'>
                {course?.description}
              </Text>
            </Stack>
            <Button onClick={openEdit}>
              <IconEdit />
            </Button>
          </div>
      }

    </>
  )
}
export default FullCourse
