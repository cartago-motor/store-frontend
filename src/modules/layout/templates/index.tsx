import Footer from "@modules/layout/templates/footer"
import Navbar from "@modules/layout/templates/navbar"
import React from "react"

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
