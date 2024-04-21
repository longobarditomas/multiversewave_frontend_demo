import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'

interface SocialProps {
	name: string;
	code: string;
}

const Socials = ( props: SocialProps) => {
	if (props.name === 'spotify') 
		return (
			<a href={"https://open.spotify.com/artist/"+props.code} style={{ textDecoration: "none", color: "white", paddingRight: "10px" }}>
			<FontAwesomeIcon icon={faSpotify} className="fa-2x" />
			</a>
		);	  
	else if (props.name === 'instagram')
		return (
			<a href={"https://www.instagram.com/"+props.code} style={{ textDecoration: "none", color: "white", paddingRight: "10px" }}>
			<FontAwesomeIcon icon={faInstagram} className="fa-2x" />
			</a>
		);	
	else if (props.name === 'youtube')
		return (
			<a href={"https://www.youtube.com/channel/"+props.code} style={{ textDecoration: "none", color: "white", paddingRight: "10px" }}>
			<FontAwesomeIcon icon={faYoutube} className="fa-2x" />
			</a>
		);	
	
	return null; 
};

export default Socials;