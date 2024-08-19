import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './index.css'
import Menu from "./Menu";

type item = { iname: string, to: boolean, from: boolean }
type category = { cname: string, color: string, items: item[]}

function App() {
  const [categories, setCategories] = useState<category[] | null>(null)
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Menu categories={categories} setCategories={setCategories}/>}/>
      </Routes>
    </>
  )
}

export default App
