import { AppShell, Navbar } from "@mantine/core";
import { type ReactNode } from "react";
import { Header, MainLinks } from "~/ui";

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <AppShell
        padding="sm"
        navbar={<Navbar width={{ base: 300 }} height={`calc(100vh - 100px)`} sx={() => ({
          zIndex: 0
        })}>
          <Navbar.Section grow mt='md'>
            <MainLinks />
          </Navbar.Section>
        </Navbar>}
        header={<Header links={[{ link: '/', label: 'home' }]} />
        }
      >
        {children}
      </AppShell>
    </>
  )
}