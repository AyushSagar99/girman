
import logo from "../assets/Logo-2.png"

function Navbar() {
  return (
    <>
    <div className=' flex justify-evenly h-24 p-5 shadow-xl items-center '>
    <div className=' justify-evenly items-center'>
      <a href='/'><img
      src={logo}
      width={150}
      height={80}
      
      /></a>
      </div>

      <div className='flex gap-16 justify-center items-center'>
      <a href='/'>SEARCH</a>
      <a href='https://girmantech.com' target='/'>WEBSITE</a>
      <a href='https://www.linkedin.com/company/girmantech/' target='/'>LINKEDIN</a>
      <a href='mailto:contact@girmantech.com'>CONTACT</a>
      </div>
      </div>
    </>
  )
}

export default Navbar