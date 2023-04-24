import { Card as CardM, Image, Text, Badge, Button, Group } from '@mantine/core';
import { type Course } from '@prisma/client';

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

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{course.title}</Text>
      </Group>

      <Text size="sm" color="dimmed">
        {course.description}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </CardM>
  );
}