import { type InferGetStaticPropsType, type GetStaticPaths, type GetStaticPropsContext, type NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { ssgHelper } from '~/server/api/ssgHelper'
import { api } from '~/utils/api'
import ErrorPage from 'next/error'
import { Flex, Text } from '@mantine/core'
import Link from 'next/link'
import { IconArrowBadgeLeft } from '@tabler/icons-react'
import Image from 'next/image'





const ProfilePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ id, trpcState }) => {

  const { data: profile } = api.profile.getById.useQuery({ id })

  if (profile == null || profile.name == null) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <Head>
        <title>{`Profile ${profile.name}`}</title>
      </Head>

      <Link href='..'>
        <IconArrowBadgeLeft size={30} />
      </Link>
      <Flex gap='md' align='center'>
        <Image width={50} height={50} src={profile.image} alt='profile image' style={{
          borderRadius: '50%'
        }} />
        <Text
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
          ta="center"
          fz="xl"
          fw={700}
        >
          {profile.name}
        </Text>

      </Flex>
      <div className="">
        {profile.courseCount}{' '}
        {getPlural(profile.courseCount, 'Course', 'Courses')}
      </div>

    </>
  )
}

const pluralRules = new Intl.PluralRules()

function getPlural(number: number, singular: string, plural: string) {
  return pluralRules.select(number) === 'one' ? singular : plural
}


export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps(context: GetStaticPropsContext<{ id: string }>) {
  const id = context.params?.id
  if (id == null) {
    return {
      redirect: {
        destination: '/'
      }
    }
  }
  const ssg = ssgHelper();
  await ssg.profile.getById.prefetch({ id })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id
    }
  }
}


export default ProfilePage
