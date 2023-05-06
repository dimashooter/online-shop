import { useDisclosure } from '@mantine/hooks';
import { Modal as MantineModal, Group, Button, TextInput, Text } from '@mantine/core';
import { useState, type ReactNode, useCallback } from 'react';
import { useForm } from '@mantine/form';
import { api } from '~/utils/api';
import { toast } from 'react-hot-toast';

interface ModalProps {
  children?: ReactNode
}

enum STEPS {
  DEFAULT = 1,
  TITLE_STEP = 2,
  DESCRIPTION_STEP = 3
}

export const Modal = ({ children }: ModalProps) => {

  const createCourse = api.courses.createCourse.useMutation({
    onSuccess: () => {
      toast.success("Course created!")
    },
    onError: () => {
      toast.error('something goes wrong!')
    }
  })
  const courses = api.courses.getAll.useQuery()

  const [step, setStep] = useState(STEPS.DEFAULT);


  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
    },
    validate: {
      title: (value) => (value.length < 2 ? 'Title must have at least 2 letters' : null),
      description: (value) => (value.length < 2 ? 'Description must have at least 2 letters' : null),
    },
  });

  const onNext = useCallback(() => {
    if (step === STEPS.DESCRIPTION_STEP) {
      return;
    } else {
      setStep(prevValue => prevValue + 1)
    }
  }, [step])

  const onPrev = useCallback(() => {
    if (step === 1) {
      return;
    } else {
      setStep(prevValue => prevValue - 1)
    }
  }, [step])



  let content = (
    <div>
      <Text color='cyan' size='lg' align='center'>Create new course!</Text>
    </div>
  )
  if (step === STEPS.DEFAULT) {

    content
  }

  if (step === STEPS.TITLE_STEP) {
    content = (
      <>
        <Text align='center' color='orange'>Add a title please!</Text>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="title"
          {...form.getInputProps('title')}
        />
      </>
    )
  }
  if (step === STEPS.DESCRIPTION_STEP) {
    content = (
      <div>
        <Text align='center' color='orange'>Add a description please!</Text>
        <TextInput
          withAsterisk
          label="description"
          placeholder="description"
          {...form.getInputProps('description')}
        />
      </div>
    )
  }

  return (
    <>
      <MantineModal opened={opened} onClose={close} centered transitionProps={{ transition: 'rotate-left' }}>
        <form onSubmit={form.onSubmit(async (values) => {
          await createCourse.mutateAsync(values)
          await courses.refetch()
          form.reset()
          close()
        })}>
          {content}
          <Group position="right" mt="md">
            {step > 1 && <Button type='button' onClick={onPrev}>back</Button>}
            {step < STEPS.DESCRIPTION_STEP && <Button type='button' onClick={onNext}>next</Button>}
            {step === STEPS.DESCRIPTION_STEP && <Button type='submit'>submit</Button>}
          </Group>
        </form>
      </MantineModal>

      <Group position="center">
        <Button onClick={open}>Open centered Modal</Button>
      </Group>
    </>
  );
}