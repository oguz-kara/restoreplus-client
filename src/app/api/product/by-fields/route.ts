import { sdk } from '@/restoreplus-sdk'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  try {
    const lang = req.nextUrl.searchParams.get('lang')
    const { categoryId, sectorId, applicationScopeId, page, take, term } =
      await req.json()

    console.log({ categoryId, sectorId, applicationScopeId, page, take, term })

    const result = await sdk.products.getByFields({
      categoryId,
      sectorId,
      applicationScopeId,
      lang: lang as string,
      page,
      take,
      term,
    })

    console.log({ result })

    return NextResponse.json(result)
  } catch (err: any) {
    console.log({ err })

    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
