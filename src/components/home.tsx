
import girman from "../assets/Group 1.png"

export default function Home() {
  return (
    <>
    <div className='flex gap-3 justify-center items-center'>
        <img
        src={girman}
        width={150}
        height={70}
        />
        <h1 className='font-medium text-9xl'>Girman</h1>
    </div>
    </>
  )
}
