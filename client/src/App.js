import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import link from './link.png'
const App = () => {

  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [shorturl, setshorturl] = useState('')

  const generateurl =async () =>{
    const response = await axios.post('link' ,{
      url,
      slug
    })
    setshorturl(response?.data?.data?.shortlink);
  }

  const copyShortUrl = () =>{
    navigator.clipboard.writeText(shorturl)
    alert("copied to clickboard")
  }
  return (
    <div className='maindiv'>

      <div className='quicklink-container'>
        <div className='input-data'>
          <h2>Quick Link Generatore</h2>
          <form>

            <div className='input-box'>
              <input type='text' value={url} placeholder='Enter Url' onChange={(e) => {
                setUrl(e.target.value);
              }} /> 
            </div>


            <div className='input-box'>
              <input type='text' value={slug} placeholder='Enter Short Url (Option)' onChange={(e) => {
                setSlug(e.target.value)
              }} />
            </div>


            <div className='input-box'>
              <input type='text' placeholder='Short Url Generatore' value={shorturl} disabled />
            </div>
            <div className='button-copy-link'>
            <button type='button' className='send' onClick={generateurl}>Genrate Link</button> <span onClick={copyShortUrl} ><img src={link} className='linkimg'/></span>
            </div>

          </form>

        </div>

        <div className='rightdiv'>

        </div>
      </div>
    </div>
  )
}

export default App
