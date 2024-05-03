import React, {useState} from 'react';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { Artist } from '../../../types/artist.interface';

type ArtistImageProps = {
    artist?: Artist | null;
    setSelectedTypeImage: React.Dispatch<React.SetStateAction<File | null>>;
};

const ArtistImage = ({artist = null, setSelectedTypeImage}: ArtistImageProps) => {
  
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedTypeImage(file);
            const fileUrl = URL.createObjectURL(file);
            setImagePreviewUrl(fileUrl);
        }
    };

    return (
        <>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label className="artist-form-img">
                {imagePreviewUrl ? (
                    <Image alt="preview-img" src={imagePreviewUrl} roundedCircle />
                ) : artist ? (
                    <div className="image-edit-container">
                        <Image alt={artist.name} src={`${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/images/artists/artist_${artist.id}.jpg`} roundedCircle />
                        <FontAwesomeIcon icon={faPenToSquare} className="image-edit-icon" />
                    </div>

                ) : (
                    <FontAwesomeIcon icon={faCirclePlus} />
                )}
                </Form.Label>
                <Form.Control type="file" onChange={handleFileChange} accept="image/*" hidden />
            </Form.Group>
        </>
    );
};
  
export default ArtistImage;
  