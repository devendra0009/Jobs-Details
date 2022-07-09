import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [loading,setLoading]=useState(true)
  const [jobs,setJobs]=useState([])
  const [value,setValue]=useState(0)

  const fetchHandler=async()=>{
    const response=await fetch(url)
    const newJobs=await response.json()
    // data.then((res)=>{console.log(res);})
    setJobs(newJobs)
    setLoading(false);
  }

  useEffect(()=>{
    fetchHandler()
  },[])

  if(loading)
  {
    return(
    <section className="section loading">

      <h2>Loading...</h2>
      </section>
    )   
  }

  const {title,dates,duties,company}=jobs[value]  //destructure this after the laoding because back themn jobs are undefined (empty array:( )

  return( <section className='section'>
    <div className="title">
      <h2>Experience</h2>
    <div className="underline"></div>
    </div>
    <div className="jobs-center">
      {/* btn container */}
      <div  className="btn-container">
        {
          jobs.map((job,index)=>{
            return(
              <button key={job.id} onClick={()=>{setValue(index)}} className={`job-btn
              ${index===value&&'active-btn'} `} >{job.company}</button>
            )

          })
        }
      </div>
      {/* info container  */}
      <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="jobs-date">{dates}</p>
          <p>{
            duties.map((duty,index)=>{
              return(
                <div key={index} className="job-desc">
                  <FaAngleDoubleRight className='job-icon'/>
                  <p>{duty}</p>
                </div>
              )
            })
          }</p>

      </article>
    </div>
  </section>
  )
}

export default App
