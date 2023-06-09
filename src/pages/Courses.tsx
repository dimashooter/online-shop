/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Flex, Loader, Text } from '@mantine/core'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useState } from 'react'
import { LikedCourses } from '~/ui'
import CoursesList from '~/ui/CoursesList/CoursesList'
import { Modal } from '~/ui/Modal/Modal'
import { api } from '~/utils/api'


const tabs = ['recently', 'followed'] as const

const Courses = () => {
  const [selected, setSelected] = useState<(typeof tabs)[number]>('recently')
  const user = useSession()

  const { data: courses, isLoading, } = api.courses.getAll.useQuery(undefined, {
    enabled: Boolean(user.data)
  })

  if (isLoading && Boolean(user.data)) {
    return <Loader />
  }
  return (
    <div>
      <Head>
        <title>Manage Courses</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex justify='space-between' align='center' sx={() => ({
        marginBottom: "5em"
      })}>
        <Text size='lg'>Maintain courses</Text>
        <Modal />

      </Flex>
      <div>
        {tabs.map((tab) => (
          <button key={tab}
            onClick={() => setSelected(tab)}
            style={{
              cursor: 'pointer',
              padding: '1rem',
              border: tab === selected ? '1px solid #ccc' : '1px solid transparent',
              background: tab === selected ? 'blue' : 'none',
              borderRadius: '12px'
            }}

          >{tab}</button>
        ))}
      </div>
      {
        selected === 'recently' && courses?.courses
        && <CoursesList courses={courses.courses} />}

      {selected === 'followed' && <LikedCourses />}
    </div>
  )
}

export default Courses
