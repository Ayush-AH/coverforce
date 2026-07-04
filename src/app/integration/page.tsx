import React from 'react'
import PageWrapper from '@/components/PageWrapper'
import Hero from '@/components/integration/Hero'
import CardSection from '@/components/integration/CardSection'
import Integration from '@/components/integration/Integration'

const IntegrationPage = () => {
  return (
    <PageWrapper>
        <Hero/>
        <CardSection/>
        <Integration/>
    </PageWrapper>
  )
}

export default IntegrationPage