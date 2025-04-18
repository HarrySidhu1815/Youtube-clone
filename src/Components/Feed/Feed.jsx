import React, { useEffect, useState } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import { value_converter } from '../../data.js'
import moment from 'moment'

const Feed = ({category}) => {

    const [data, setData] = useState([])
    const fetchData = async () => {
        const video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${import.meta.env.VITE_API_KEY}`

        await fetch(video_url).then(response => response.json()).then(data => setData(data.items))
    }

    useEffect(() => {
        fetchData()
    }, [category])

  return (
    <div className='feed'>
        {data.map((item, index) => (
            <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className='card'>
                <img src={item.snippet.thumbnails.medium.url} alt=""/>
                <h2>{item.snippet.title}</h2>
                <h3>{item.snippet.channelTitle}</h3>
                <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
          </Link>
        ))}
    </div>
  )
}

export default Feed
