import React, { useEffect, useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import makeRequest from "../hooks/use-request";
import ArtistScroll from "../components/artists/Scroll";
import { Artist } from '../types/artist.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Home.module.css';

interface ArtistsByTag {
  [key: string]: Artist[];
}

function HomePage() {
  const [artistsByTags, setArtistsByTags] = useState<ArtistsByTag>({});
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await makeRequest(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/artists/by-tags`, "get", {});
        if (response.data) setArtistsByTags(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToArtists = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container fluid>
      <div className={`${styles.homeContainer} ${styles.responsiveDiv}`}>
        <h1>Multiverse Wave</h1>
        <h2>Synchronize once, update everywhere.</h2>
        <p>Welcome to the simplest way to manage your music online.</p>
        <Button className={styles.ctaButton} variant="outline-danger" onClick={scrollToArtists}>Get Started</Button>
        
        <div className={styles.scrollDown} onClick={scrollToArtists}>
          <h6>Explore Artists</h6>
          <FontAwesomeIcon icon={faAnglesDown} className={`fa-2x arrow-down ${styles.myCustomBeat}`} />
        </div>
      </div>

      {Object.keys(artistsByTags).length > 0 && (
        <div ref={divRef}>
          {Object.keys(artistsByTags).map((tagName) => (
            <div key={tagName}>
              <h4 className="my-container slide-in-from-left">{tagName.charAt(0).toUpperCase() + tagName.slice(1)}</h4>
              <ArtistScroll artists={artistsByTags[tagName]}/>
              <br/>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

export default HomePage;
