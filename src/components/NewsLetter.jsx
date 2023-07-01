import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'


const NewsLetter = () => {
    const [userNewsEmail , setUserNewsEmail] = useState('')
  return (
    <>
        <section id="newsletter" className='section-p1' style={{margin:"0 auto",width:"95%",borderRadius:"30px"}}>
            <div className="newsText">
                <h4>Sign Up for NewsLetter</h4>
                <p>Get Email updates about our latest products and offers.</p>
            </div>
            <div className="newsform">
                <input type="text"  placeholder='Your E-mail Address' value={userNewsEmail} onChange={(e) => setUserNewsEmail(e.target.value)}/>
                <button>Sign Up</button>
            </div>
        </section>
    </>
  )
}

export default NewsLetter