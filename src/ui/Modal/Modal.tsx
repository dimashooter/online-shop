import { useDisclosure } from '@mantine/hooks';
import { Modal as MantineModal, Group, Button, TextInput } from '@mantine/core';
import { type ReactNode } from 'react';
import { useForm } from '@mantine/form';
import { api } from '~/utils/api';

interface ModalProps {
  children: ReactNode
}

export const Modal = ({ children }: ModalProps) => {

  const createCourse = api.courses.createCourse.useMutation()
  const courses = api.courses.getAll.useQuery()




  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
    },
  });

  return (
    <>
      <MantineModal opened={opened} onClose={close} title="Authentication" centered transitionProps={{ transition: 'rotate-left' }}>
        <form onSubmit={form.onSubmit(async (values) => {
          await createCourse.mutateAsync(values)
          await courses.refetch()
          form.reset()
          close()

        })}>
          <TextInput
            required
            withAsterisk
            label="Title"
            placeholder="title"
            {...form.getInputProps('title')}
          />
          <TextInput
            required
            withAsterisk
            label="description"
            placeholder="description"
            {...form.getInputProps('description')}
          />
          <Group position="right" mt="md">
            <Button type="submit" >Submit</Button>
          </Group>
        </form>
      </MantineModal>

      <Group position="center">
        <Button onClick={open}>Open centered Modal</Button>
      </Group>
    </>
  );
}