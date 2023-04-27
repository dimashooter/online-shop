import { Card as CardM, Image, Button, } from '@mantine/core';
import { type Course } from '@prisma/client';
import Link from 'next/link';
import { Heading } from '../Heading/Heading';

interface CardProps {
  course: Course
}

export const Card = (props: CardProps) => {
  const { course } = props



  return (
    <CardM sx={() => ({
      maxWidth: '400px'
    })} shadow="sm" padding="lg" radius="md" withBorder >
      <CardM.Section>
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
    </CardM >
  );
}