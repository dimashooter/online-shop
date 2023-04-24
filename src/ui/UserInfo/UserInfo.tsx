import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

}));

interface UserInfoProps {
  avatar?: string;
  name?: string;
  email?: string;
}

export function UserInfo({ avatar, name, email }: UserInfoProps) {
  const { classes } = useStyles();
  return (
    <div style={{ marginLeft: 'auto' }}>
      <Group noWrap>
        <Avatar src={avatar} size={50} radius="md" />
        <div>
          <Text fz="lg" fw={500} >
            {name}
          </Text>
          <Group noWrap spacing={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {email}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}