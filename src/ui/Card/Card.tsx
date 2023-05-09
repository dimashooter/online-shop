/* eslint-disable @typescript-eslint/no-misused-promises */
import { Card as CardM, Image, Button, Text, } from '@mantine/core';
import { type Course } from '@prisma/client';
import Link from 'next/link';
import { Heading } from '../Heading/Heading';
import dayjs from 'dayjs'
import { IconHeart } from '@tabler/icons-react';
import { api } from '~/utils/api';

interface CardProps {
  course: Course
}

export const Card = (props: CardProps) => {
  const { course } = props

  const date = dayjs(course.createdAt).format('YYYY-MM-DD HH:mm:ss')


  const addTofavorite = api.courses.addToFavorite.useMutation()

  const handleFavorite = async () => {
    await addTofavorite.mutateAsync({
      courseId: course.id
    })

  }

  return (
    <CardM sx={() => ({
      maxWidth: '400px'
    })} shadow="sm" padding="lg" radius="md" withBorder >
      <CardM.Section style={{
        position: 'relative'
      }}>
        <IconHeart onClick={handleFavorite} width={30} height={30} color='red' style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 10,
          cursor: 'pointer'
        }}
        />
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </CardM.Section>

      <Heading title={course.title.length > 20 ? course.title.slice(0, 20).concat('...') : course.title} subtitle={course.description.length > 50 ? course.title.slice(0, 50).concat('...') : course.description} />
      <Link href={`/Courses/${course.id}`} >
        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          more
        </Button>
      </Link>
      <Text fz={'sm'}>{date}</Text>

    </CardM >
  );
}