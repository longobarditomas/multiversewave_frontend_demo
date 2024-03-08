import React from 'react';

const YoutubeItem = ({external_id}: {external_id: string}) => {
    return (
        <div key={external_id} className="video-item">
            <iframe
            /* width="560"
            height="315" */
            src={`https://www.youtube.com/embed/${external_id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            ></iframe>
        </div>
    );
  };
  
  export default YoutubeItem;
  