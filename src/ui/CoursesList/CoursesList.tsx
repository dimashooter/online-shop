import { Flex } from '@mantine/core'
import React, { memo } from 'react'
import { Card, type Course } from '../Card/Card'

interface CoursesListProps {
  courses: Course[]
}

const CoursesList = ({ courses }: CoursesListProps) => {
  return (
    <Flex
      mt='md'
      gap="50px"
      justify="flex-start"
      align="center"
      direction="row"
      wrap="wrap"
    >
      {
        courses.map(course => (
          <Card myCourse={course.myCourse} key={course.id}
            id={course.id} description={course.description} createdAt={course.createdAt} likeCount={course.likeCount} title={course.title} user={course.user} likedByMe={course.likedByMe} />
        ))
      }
    </Flex>
  )
}

export default memo(CoursesList)
