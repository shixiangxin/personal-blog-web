import { EventBus } from './eventBus'

export interface User {
  id: number
  name: string
}

export type AppEvents = {
  'message:loadMore': [blogId: string]
  'scroll:lazy': []
}

const eventBus = new EventBus<AppEvents>()

export default eventBus
