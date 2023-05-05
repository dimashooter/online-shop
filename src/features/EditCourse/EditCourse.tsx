import { Button, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { memo } from 'react'
import { api } from '~/utils/api'


interface EditCourseType {
  title: string | undefined,
  description: string | undefined,
  close: () => void
  id: string
}

const EditCourse = ({ close, title, description, id }: EditCourseType) => {

  const form = useForm({
    initialValues: {
      title: title || '',
      description: description || '',
    },
    validate: {
      title: (value) => (value.length < 2 ? 'Title must have at least 2 letters' : null),
      description: (value) => (value.length < 2 ? 'Description must have at least 2 letters' : null),
    },
  });

  const updateCourse = api.courses.editCourse.useMutation({
    onSuccess: () => {
      close()
    }
  })
  return (
    <div>
      <Stack>
        <form onSubmit={form.onSubmit(async (values) => {
          await updateCourse.mutateAsync({
            ...values,
            courseId: id
          })
          form.reset()
        })}>

          <TextInput
            withAsterisk
            label="title"
            placeholder="title"
            {...form.getInputProps('title')}
          /><TextInput
            withAsterisk
            label="description"
            placeholder="description"
            {...form.getInputProps('description')}
          />
          <Button type='submit'>send</Button>
        </form>
      </Stack>
    </div>
  )
}

export default memo(EditCourse)
