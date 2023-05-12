import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core"
import { IconPencil, IconChartLine, IconDashboard, IconMoodHappy } from "@tabler/icons-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { type ReactNode } from "react"

interface MainLinkProps {
  icon: ReactNode,
  color: string,
  label: string
  href: string
}
let data = []

export const MainLinks = () => {

  const user = useSession()
  console.log(user.status);

  if (user.status == 'authenticated') {
    data = [
      {
        icon: <IconDashboard size='1rem' />,
        color: 'teal',
        label: "Dashboard",
        href: '/'
      },
      {
        icon: <IconPencil size='1rem' />,
        color: 'blue',
        label: "Manage courses",
        href: '/Courses'
      },
      {
        icon: <IconMoodHappy size='1rem' />,
        color: 'blue',
        label: "Profile",
        href: `/profile/${user.data?.user.id}`
      },
    ]
  } else {
    data = [
      {
        icon: <IconDashboard size='1rem' />,
        color: 'teal',
        label: "Dashboard",
        href: '/'
      },
      {
        icon: <IconPencil size='1rem' />,
        color: 'blue',
        label: "Manage courses",
        href: '/Courses'
      },
    ]
  }

  return (
    <>
      {data.map(link => (
        <Link key={link.href} href={link.href}>
          <UnstyledButton sx={(theme) => ({
            display: 'block',
            width: '100%',
            padding: theme.spacing.sm,
            borderRadius: theme.radius.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
            "&:hover": {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            }
          })}  >
            <Group>

              <ThemeIcon color={link.color} variant="light">
                {link.icon}
              </ThemeIcon>
              <Text size='sm' >{link.label}</Text>
            </Group >
          </UnstyledButton>
        </Link>
      ))}

    </>
  )
}

