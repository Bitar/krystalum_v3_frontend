import {Country} from '../../misc/Country'

export type PublisherInfo = {
  id: number
  email: string | null
  hq_address: string | null
  hq_country: Country | null
}
