import Review from '@/components/home/Review'
import React from 'react'
import OperatingSystem from '@/components/solutions/carrier/OperatingSystem'
import CarrierResults from '@/components/home/CarrierResults'
import Hero from '@/components/solutions/carrier/Hero'
import Stat from '@/components/solutions/carrier/Stat'
import PageWrapper from '@/components/PageWrapper'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata('/solutions/carrier')

const page = () => {
  return (
    <>
    <PageWrapper>
    <Hero/>
    <OperatingSystem/>
    <Stat/>
    <Review/>
    <CarrierResults/>
    </PageWrapper>
    </>
  )
}

export default page
