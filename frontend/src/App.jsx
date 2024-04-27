import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import ProvaForm from './components/ProvaForm'
import Table from './components/Table'
import AgendarProva from './components/AgendarProva'



function App() {

  const [provas, setProvas] = useState("")
  const [isLoading, setisLoading] = useState(true)


  useEffect( () => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:7200/api/prova/")
      console.log(response);
      setProvas(response.data)
      setisLoading(false)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='bg-indigo-100 px-8 min-h-screen'>
      <nav className='pt-8'>
        <h1 className='text-6xl text-center pb-20 tracking-wide' >Provas</h1>
      </nav>
      <ProvaForm 
        setProvas = {setProvas}
        fetchData={fetchData}
        isLoading = {isLoading}
        provas={provas}
        />
      <Table 
        provas={provas}
        setProvas = {setProvas}
        isLoading = {isLoading}
        />


      
    </div>
  )
}

export default App



