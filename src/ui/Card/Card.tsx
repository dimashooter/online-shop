/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Card as CardM, Image, Button, Text, Flex, } from '@mantine/core';
import Link from 'next/link';
import { Heading } from '../Heading/Heading';
import dayjs from 'dayjs'
import { api } from '~/utils/api';
import { ButtonLike } from '../ButtonLike/ButtonLike';
import { memo } from 'react';

export interface Course {
  id: string
  description: string
  createdAt: Date
  likeCount: number,
  likedByMe: boolean
  title: string,
  user: User
  myCourse: boolean

}
type User = {
  id: string,
  name: string | null,
  image: string | null
}



export const Card = memo((props: Course) => {
  const { createdAt, description, id, likeCount, likedByMe, title, user, myCourse } = props

  const trpcUtils = api.useContext()
  const date = dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')
  const toggleLike = api.courses.toggleLike.useMutation({
    // onSuccess: ({ addedLike }) => {
    //   const updateData: Parameters<
    //     typeof trpcUtils.courses.getAll.setInfiniteData
    //   >[1] = (oldData) => {
    //     if (oldData == null) return;

    //     const countModifier = addedLike ? 1 : -1;

    //     return {
    //       ...oldData,
    //       pages: oldData.pages.map((page) => {
    //         return {
    //           ...page,
    //           courses: page.courses.map((cls) => {
    //             if (cls.id === id) {
    //               return {
    //                 ...cls,
    //                 likeCount: cls.likeCount + countModifier,
    //                 likedByMe: addedLike,
    //               };
    //             }

    //             return cls;
    //           }),
    //         };
    //       }),
    //     };
    //   };

    //   trpcUtils.courses.getAll.setInfiniteData({}, updateData);
    // },
    onSuccess: async () => {
      await trpcUtils.courses.getAll.invalidate()
    }
  });

  function handleToggleLike() {
    toggleLike.mutate({ id })
  }

  return (
    <CardM sx={() => ({
      maxWidth: '400px'
    })} shadow="sm" padding="lg" radius="md" withBorder >
      <CardM.Section style={{
        position: 'relative',
        padding: '1rem'
      }}>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </CardM.Section>

      <Heading title={title.length > 20 ? title.slice(0, 20).concat('...') : title} subtitle={description.length > 50 ? title.slice(0, 50).concat('...') : description} />
      <Link href={`/Courses/${id}`} >
        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          more
        </Button>
      </Link>
      <Flex align='center' justify='space-between'>
        <Text fz={'sm'}>{date}</Text>
        <ButtonLike isloading={toggleLike.isLoading} onClick={handleToggleLike} likeCount={likeCount} likedByMe={likedByMe} />
        {myCourse && <Button variant='filled' color='red'>delete</Button>}
      </Flex>
    </CardM >
  );
})

Card.displayName = "Card"