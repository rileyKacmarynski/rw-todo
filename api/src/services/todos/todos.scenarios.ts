import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TodoCreateArgs>({
  todo: {
    one: { data: { text: 'String', completed: true } },
    two: { data: { text: 'String', completed: true } },
  },
})

export type StandardScenario = typeof standard
