/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface Tool {
  id: string
  title: string
  type: string
  media?: {
    url?: string
  }
  createdAt?: string
  updatedAt?: string
}

interface ComponentInstance {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any
  id: string
  type: string
  // Add any other properties specific to instances
}

interface PayloadResponse {
  docs: Tool[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

interface BuildStore {
  tools: Tool[]
  components: ComponentInstance[]
  selectedComponentId: string | null
  setTools: (response: PayloadResponse) => void
  addComponent: (tool: Tool) => void
  removeComponent: (id: string) => void
  updateComponent: (id: string, updates: Partial<ComponentInstance>) => void
  selectComponent: (id: string | null) => void
}

export const useBuildStore = create<BuildStore>()(
  persist(
    set => ({
      tools: [],
      components: [],
      selectedComponentId: null,
      setTools: response => set({ tools: response.docs }),
      addComponent: (tool: Tool) => {
        set(state => {
          const newComponent = {
            id: uuidv4(),
            type: tool.type,
            props: {},
          }
          // eslint-disable-next-line no-console
          console.log('Adding new component:', newComponent) // Log new component
          return {
            components: [...state.components, newComponent],
          }
        })
      },
      removeComponent: id =>
        set(state => ({
          components: state.components.filter(c => c.id !== id),
        })),
      updateComponent: (id, updates) =>
        set(state => ({
          components: state.components.map(c => (c.id === id ? { ...c, ...updates } : c)),
        })),
      selectComponent: id => set({ selectedComponentId: id }),
    }),
    {
      name: 'builder-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
