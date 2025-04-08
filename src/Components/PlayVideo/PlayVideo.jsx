import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'

const PlayVideo = ({videoId}) => {

    const [apiVideoData, setApiVideoData] = useState(null)
    const [channelData, setChannelData] = useState(null)

    const fetchVideoData = async() => {
        const videodata_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`

        await fetch(videodata_url).then(response => response.json()).then(data => setApiVideoData(data.items[0]))
    }

    const fetchChannelData = async() => {
        const channeldata_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiVideoData.snippet.channelId}&key=${API_KEY}`

        await fetch(channeldata_url).then(response => response.json()).then(data => setChannelData(data.items[0]))
    }

    useEffect(() => {
        fetchVideoData()
    }, [])

    useEffect(() => {
        fetchChannelData()
    }, [apiVideoData])

  return (
    <div className='play-video'>
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <h3>{apiVideoData? apiVideoData.snippet.title : "Title Here"}</h3>
      <div className="play-video-info">
        <p>{apiVideoData ? value_converter(apiVideoData.statistics.viewCount) : "16K"} &bull; {apiVideoData ? moment(apiVideoData.snippet.publishedAt).fromNow() : "2 days ago"}</p>
        <div>
            <span><img src={like}/>{apiVideoData ? value_converter(apiVideoData.statistics.likeCount) : "155"}</span>
            <span><img src={dislike}/></span>
            <span><img src={share}/>Share</span>
            <span><img src={save}/>Save</span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} />
        <div>
            <p>{apiVideoData ? apiVideoData.snippet.channelTitle: ""}</p>
            <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiVideoData ? apiVideoData.snippet.description.slice(0, 250)  : "Decription Here"}</p>
        <hr />
        <h4>{apiVideoData ? value_converter(apiVideoData.statistics.commentCount) : "102"} Comments</h4>
        <div className="comment">
            <img src={user_profile}/>
            <div>
                <h3>Jack Nicholson <span>1 day ago</span></h3>
                <p>A global computer network providing a variety of information and communication facilities, consisting of interconnected networks using standardized communication protocols.</p>
                <div className="comment-action">
                    <img src={like} alt=""/>
                    <span>244</span>
                    <img src={dislike} alt=""/>
                </div>
            </div>
        </div>
        <div className="comment">
            <img src={user_profile}/>
            <div>
                <h3>Jack Nicholson <span>1 day ago</span></h3>
                <p>A global computer network providing a variety of information and communication facilities, consisting of interconnected networks using standardized communication protocols.</p>
                <div className="comment-action">
                    <img src={like} alt=""/>
                    <span>244</span>
                    <img src={dislike} alt=""/>
                </div>
            </div>
        </div>
        <div className="comment">
            <img src={user_profile}/>
            <div>
                <h3>Jack Nicholson <span>1 day ago</span></h3>
                <p>A global computer network providing a variety of information and communication facilities, consisting of interconnected networks using standardized communication protocols.</p>
                <div className="comment-action">
                    <img src={like} alt=""/>
                    <span>244</span>
                    <img src={dislike} alt=""/>
                </div>
            </div>
        </div>
        <div className="comment">
            <img src={user_profile}/>
            <div>
                <h3>Jack Nicholson <span>1 day ago</span></h3>
                <p>A global computer network providing a variety of information and communication facilities, consisting of interconnected networks using standardized communication protocols.</p>
                <div className="comment-action">
                    <img src={like} alt=""/>
                    <span>244</span>
                    <img src={dislike} alt=""/>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PlayVideo
