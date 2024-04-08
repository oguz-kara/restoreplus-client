import { serverFetcher } from '@/lib/server-fetcher'

export async function getSectorIds(subSectors: Sector[], sectorId?: string) {
  try {
    let data

    if (!subSectors) {
      const response = await serverFetcher(`/sectors/${sectorId}`)
      data = response.data.subSectors
    } else {
      data = subSectors
    }

    const sectorIdsSet = new Set()

    if (sectorId) sectorIdsSet.add(Number(sectorId))

    if (data && Array.isArray(data)) {
      for (const sector of data) {
        const { id, subSectors } = sector
        sectorIdsSet.add(id)

        if (subSectors && subSectors.length > 0) {
          const subsectorIds = await getSectorIds(subSectors, id)
          subsectorIds.forEach((subsectorId) => sectorIdsSet.add(subsectorId))
        }
      }
    }

    return Array.from(sectorIdsSet) as number[]
  } catch (error) {
    console.error('Error fetching sectors:', error)
    return []
  }
}
