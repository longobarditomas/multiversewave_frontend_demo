import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SpotifyDocs = () => {
    return (
        <Row>
            <Col md={12}>
                <ol>
                    <li><strong>Open Spotify:</strong> Access Spotify via the app or web player.</li>
                    <li><strong>Artist Profile:</strong> Search and navigate to the desired artist&apos;s profile.</li>
                    <li>
                        <strong>Copy the Artist URL link:</strong>
                        <ul>
                            <li><strong>Web Browser:</strong> Navigate to the artist&apos;s Spotify page and copy the URL from your browser&apos;s address bar.</li>
                            <li><strong>Spotify App:</strong> Tap the three dots (...) on the artist&apos;s profile, select &apos;Share&apos;, then &apos;Copy link to artist&apos;.</li>
                        </ul>
                    </li>
                    <li><strong>Extract the ID:</strong> The ID is located after <code>https://open.spotify.com/artist/</code> and before any &quot;?&quot; sign. For example, in <code>https://open.spotify.com/artist/XXXXX?si=Y123abc</code>, <code>XXXXX</code> is the ID.</li>
                    <li><strong>Use the ID:</strong> Enter this ID or the URL (up to the &quot;?&quot;) into the designated &apos;Spotify Artist ID&apos; input field to synchronize your music.</li>
                </ol>
            </Col>
        </Row>
    );
  };
  
  export default SpotifyDocs;
  