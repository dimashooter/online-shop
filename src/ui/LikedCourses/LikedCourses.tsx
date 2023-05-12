import { Loader, Title } from '@mantine/core';
import React, { memo } from 'react'
import { api } from '~/utils/api'
import CoursesList from '../CoursesList/CoursesList';

export const LikedCourses = memo(() => {
  const { data, isLoading } = api.courses.getLikedCourses.useQuery()

  if (isLoading) {
    return <Loader />
  }
  if (data == null) {
    return <Title>no liked courses </Title>
  }
  return (
    <CoursesList courses={data?.courses} />
  )
})

LikedCourses.displayName = 'LikedCourses'
