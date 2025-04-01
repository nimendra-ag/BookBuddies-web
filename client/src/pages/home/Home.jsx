import React from 'react'
import Navbar from '../../components/navbar/Navbar.jsx'
import Hero from '../../components/hero/Hero.jsx'
// import ExploreMoreInHomePage from '../../components/exploreMoreSectionInHomePage/exploreMoreInHomePage.jsx'
import Footer from '../../components/footer/Footer.jsx'
import ExploreMore from '../../components/exploreMore/ExploreMore.jsx'

const Home = () => {
  return (
   <>
   <Navbar/>
   <Hero/>
   {/* <ExploreMoreInHomePage/> */}
   <ExploreMore/>
   <Footer/>
   </>
  )
}

export default Home