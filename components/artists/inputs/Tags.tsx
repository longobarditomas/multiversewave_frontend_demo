import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import makeRequest from "../../../hooks/use-request";
import { Artist, Tag } from '../../../types/artist.interface';

const ArtistTags = ({
    artist = null,
    isEnsemble,
  }: {
    artist?: Artist | null,
    isEnsemble: number,
  }) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [tags, setTags] = useState<Partial<Tag>[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await makeRequest(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/artists/tags?is_ensemble=${isEnsemble}`, "get", {});
        if (response.data) setTags(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [isEnsemble]);


  useEffect(() => {
    const artistTagNames = artist?.tags?.map(tag => tag.id) ?? [];
    setSelectedTags(artistTagNames);
  }, [artist]);

  const updateSelectedTags = (event: React.MouseEvent<HTMLElement>) => {
    const badgeTagId = (event.target as HTMLElement).id;
    const tagId = parseInt(badgeTagId.replace('badge-', ''));
    
    if (selectedTags.includes(tagId))
      setSelectedTags(selectedTags.filter(tag => tag !== tagId));
    else
      if (selectedTags.length < 3) setSelectedTags([...selectedTags, tagId]);
  };
  
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="dark" onClick={handleShow}>Tags</Button>

        <Form.Group controlId="tags[]">
          {tags.filter(tag => typeof tag.id === 'number' && selectedTags.includes(tag.id)).map((tag) => (
            <Badge key={"badge-" + tag.id} id={"badge-" + tag.id} bg="success" style={{fontSize: "16px", margin: "10px"}} >
              {tag.name}
              <Form.Control type="hidden" placeholder="Enter your test" value={tag.id} />
            </Badge>
          ))}
        </Form.Group>
      </div>

      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton style={{backgroundColor: "black"}}>
              <Modal.Title>Select Artist Tags</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{backgroundColor: "black"}}>
          <div style={{fontSize: "20px", textAlign: "center"}}>
          {tags.length > 0 &&
            tags.map((tag) => (
              <Badge key={"badge-"+tag.id} id={"badge-"+tag.id} bg={selectedTags.some((tagName) => tagName === tag.id) ? "warning" : "secondary"} text={selectedTags.some((tagName) => tagName === tag.id) ? "dark" : ""} style={{fontSize: "16px", margin: "10px"}} onClick={updateSelectedTags}>{tag.name}</Badge>
            ))
          }
          </div>
          </Modal.Body>
          <Modal.Footer style={{backgroundColor: "black"}}>
              <Button variant="danger" onClick={handleClose}>Select</Button>
          </Modal.Footer>
      </Modal>
    </>
  );
};
  
export default ArtistTags;
  