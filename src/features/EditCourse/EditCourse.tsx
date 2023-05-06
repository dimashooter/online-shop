import { Button, Flex, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { memo, useCallback } from 'react'
import { api } from '~/utils/api'


interface EditCourseType {
  title: string | undefined,
  description: string | undefined,
  close: () => void
  id: string
  refetch: () => void
}

const EditCourse = ({ close, title, description, id, refetch }: EditCourseType) => {

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
  const resetHandler = useCallback(() => {
    form.setValues({
      title, description
    })
    close()
  }, [description, form, title, close])
  return (
    <div>
      <Stack>
        <form onSubmit={form.onSubmit(async (values) => {
          await updateCourse.mutateAsync({
            ...values,
            courseId: id
          })
          form.reset()
          refetch()
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
          <Flex gap={10} mt={20}>
            <Button bg='red' type='button' onClick={resetHandler}>cancel</Button>
            <Button type='submit'>send</Button>
          </Flex>
        </form>
      </Stack>
    </div>
  )
}

export default memo(EditCourse)
