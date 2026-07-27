import fetchData from './fetchData'

export async function getBanners() {
  return await fetchData.get('/api/banner')
}
