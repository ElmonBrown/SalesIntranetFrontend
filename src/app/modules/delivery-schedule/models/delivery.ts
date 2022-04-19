export interface Delivery {
  id: string
  client: string
  date: string
  time: string
  articles: Article[]
  wasDelivered: boolean
}

interface Article {
  id: string
  name: string
}