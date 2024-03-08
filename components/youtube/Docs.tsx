import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const YoutubeDocs = () => {
    return (
        <Row>
            <Col md={12}>
                <ol>
                    <li><strong>Open YouTube:</strong> Access YouTube via the app or web browser.</li>
                    <li><strong>Channel Profile:</strong> Search and navigate to the desired YouTube channel.</li>
                    <li>
                        <strong>Finding the Channel ID:</strong>
                        <ul>
                            <li><strong>Web Browser:</strong> Go to the channel&apos;s YouTube page and copy the URL from your browser&apos;s address bar.</li>
                            <li><strong>YouTube App:</strong> Tap on the channel&apos;s profile, select &apos;About&apos;, then scroll down to find the &apos;Channel ID&apos; section.</li>
                        </ul>
                    </li>
                    <li><strong>Extract the ID:</strong> The ID is the part of the URL that comes after &apos;channel/&apos;. For example, in <code>https://www.youtube.com/channel/UCXXXXX</code>, <code>UCXXXXX</code> is the Channel ID.</li>
                    <li><strong>Use the ID:</strong> Enter this ID in the required field for any application or service that needs your YouTube Channel ID.</li>
                </ol>
            </Col>
        </Row>
    ); 
  };
  
  export default YoutubeDocs;
  