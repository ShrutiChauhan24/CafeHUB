import React from 'react'
import HeroSectionAbout from '../components/HeroSectionAbout'
import StorySectionAbout from '../components/StorySectionAbout'
import VisualSectionAbout from '../components/VisualSectionAbout'
import ValueSectionAbout from '../components/ValueSectionAbout'
import ExperienceSectionAbout from '../components/ExperienceSectionAbout'
import FounderNoteSection from '../components/FounderNoteSection'
import AboutCTA from '../components/AboutCTA'

const AboutPage = () => {
  return (
    <>
    <HeroSectionAbout/>

    <div className='space-y-0'>
    <StorySectionAbout/>
    <VisualSectionAbout/>
    <ValueSectionAbout/>
    <ExperienceSectionAbout/>
    <FounderNoteSection/>
    <AboutCTA/>
    </div>
    </>
  )
}

export default AboutPage
