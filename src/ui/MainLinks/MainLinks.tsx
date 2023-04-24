import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core"
import { IconPencil, IconChartLine, IconDashboard } from "@tabler/icons-react"
import Link from "next/link"
import { type ReactNode } from "react"

interface MainLinkProps {
  icon: ReactNode,
  color: string,
  label: string
  href: string
}
const data = [
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

export const MainLinks = () => {
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

