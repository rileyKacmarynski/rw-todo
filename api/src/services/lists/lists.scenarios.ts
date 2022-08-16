import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ListCreateArgs>({
  list: {
    one: {
      data: {
        name: 'List 1',
        author: {
          create: {
            email: 'user1@domain.com',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        name: 'List 2',
        author: {
          create: {
            email: 'user2@domain.com',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
