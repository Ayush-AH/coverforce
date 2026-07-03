import React from 'react'
import PageWrapper from '@/components/PageWrapper'
import Hero from '@/components/about/Hero'
import OurStory from '@/components/about/OurStory'
import ExpertiseBanner from '@/components/about/ExpertiseBanner'
import Milestones from '@/components/about/Milestones'
import Investors from '@/components/about/Investors'
import Leaderships from '@/components/about/Leaderships'
import OurTeam from '@/components/about/OurTeam'
import Info from '@/components/about/Info'
import Explore from '@/components/about/Explore'
import Recognition from '@/components/about/Recognition'

const AboutPage = () => {
  return (
    <>
      <PageWrapper>
        <Hero />
        <OurStory />
        <ExpertiseBanner />
        <Info/>
        <Milestones />
        <Investors />
        <Leaderships />
        <OurTeam />
        <Explore />
        <Recognition />
      </PageWrapper>
    </>
  )
}

export default AboutPage