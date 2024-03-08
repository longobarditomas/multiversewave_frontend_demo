import React from 'react';
import YoutubeItem from "./Item";
import { Multimedia } from '../../types/multimedia.interface';
  
interface YouTubeProps {
    videos: Multimedia[];
}

const Scroll = ({ videos }: YouTubeProps) => {
    return (
        <div className="video-carousel">
            {videos.map((video) => (
                <YoutubeItem key={`video-${video.id}`} external_id={video.external_id}/>
            ))}
        </div>
    );
  };
  
  export default Scroll;
  