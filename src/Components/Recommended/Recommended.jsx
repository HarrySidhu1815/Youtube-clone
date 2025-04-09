import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { value_converter } from '../../data'
import { Link } from 'react-router-dom'

const Recommended = ({categoryId}) => {

    const [apiData, setApiData] = useState([])

    const fetchData = async () => {

        const releatedvideos_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${import.meta.env.VITE_API_KEY}`

        await fetch(releatedvideos_url).then(response => response.json()).then(data => setApiData(data.items))
    }

    useEffect(() => {
        fetchData()
    }, [])

  return (
    <div className='recommended'>
        {apiData.map((item, index)=> (
            <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="video-info">
                <h4>{item.snippet.title}</h4> 
                <p>{item.snippet.channelTitle}</p>
                <p>{value_converter(item.statistics.viewCount)} Views</p>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default Recommended
