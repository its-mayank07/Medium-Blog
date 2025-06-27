import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/pages/Signup'
import Signin from './components/pages/Signin'
import Blog from './components/pages/Blog'
import Blogs from './components/pages/Blogs'
import Publish from './components/pages/Publish'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/publish' element={<Publish/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App