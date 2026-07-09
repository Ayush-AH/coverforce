import WhyCoverforce from '@/components/home/WhyCoverforce'
import Review from '@/components/home/Review'
import React from 'react'
import OperatingSystem from '@/components/solutions/developers/OperatingSystem'
import Workflow from '@/components/solutions/brokers/workflow'
import CarrierResults from '@/components/home/CarrierResults'
import Hero from '@/components/solutions/developers/Hero'
import PageWrapper from '@/components/PageWrapper'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata('/solutions/developers')

const page = () => {
  return (
    <>
      <PageWrapper>
        <Hero />
        <OperatingSystem enableHeroTransfer={true} />
        <Workflow />
        <WhyCoverforce paddingTop={true} />
        <Review />
        <CarrierResults />
      </PageWrapper>
    </>
  )
}

export default page