import { Flex, Loader, Stack, Text } from '@mantine/core'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { api } from '~/utils/api'

const FullCourse = () => {

  const router = useRouter()

  const { id } = router.query
  if (!id) {
    return null
  }
  const { data: course, isLoading } = api.courses.getOne.useQuery({ courseId: id as string }, {
    enabled: Boolean(id),
    onSuccess: () => {
      toast.success("Data success loaded!")
    }
  })

  if (isLoading) {
    return (
      <Flex justify='center' p='lg' >
        <Loader size={48} color='teal' />
      </Flex>
    )
  }
  return (
    <div>
      <Stack>
        <Text size='lg'>
          {course?.title}
        </Text>
        <Text size='sm' color='teal'>
          {course?.description}
        </Text>
      </Stack>
    </div>
  )
}
export default FullCourse
