import React, {useState, FormEvent, useEffect, useContext, useMemo} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ArtistImage from '../../components/artists/inputs/ArtistImage';
import makeRequest from "../../hooks/use-request";
import Tags from './inputs/Tags';
import UserContext from '../../context/User/UserContext';
import { Artist } from '../../types/artist.interface';
import FormErrorMessages from "../../components/form/ErrorMessages";

const ArtistForm = ({
    artist = null,
    isEnsemble,
  }: {
    artist?: Artist | null,
    isEnsemble: number,
  }) => {

    const userContext = useContext(UserContext);

    const [selectedTypeImage, setSelectedTypeImage] = useState<File | null>(null);
    
    const initialArtistState: Artist = useMemo(() => ({
        id: 0,
        name: '',
        about: '',
        is_ensemble: 0,
        tags: [],
        members: []
    }), []);
    
    const [artistForm, setArtistForm] = useState<Artist>(artist || initialArtistState);
    
    useEffect(() => {
        setArtistForm(artist || initialArtistState);
    }, [artist, initialArtistState]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        setArtistForm(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const [showAlert, setShowAlert] = useState(false);
    
    const [errors, setErrors] = useState<{ name: string[]; about: string[]; }>({
        "name": [],
        "about": []
    });

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        
        const formData = new FormData(event.currentTarget)
  
        const inputs = event.currentTarget.querySelectorAll('input, select, textarea');
        for (const input of inputs) {
            if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement || input instanceof HTMLTextAreaElement) {
                formData.append(input.id, input.value);
            }
        }
        if (selectedTypeImage) formData.append('image', selectedTypeImage);
  
        if (isEnsemble) formData.append('is_ensemble', "1");
        else formData.append('is_ensemble', "0");

        const url: string = artist ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/artists/`+artist.id+"/update" : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/artists/store`;

        const response = await makeRequest(url, "post", formData);
        if (response?.errors) setErrors(response.errors);
        else if (userContext !== null) {
            userContext.getUser();
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000);
        }
    }

    return (
        <>
            <Form onSubmit={onSubmit}>

                <ArtistImage artist={artist} setSelectedTypeImage={setSelectedTypeImage}/>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter your name" value={artistForm?.name} onChange={handleChange} />
                    <FormErrorMessages errors={errors.name} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="about">
                    <Form.Label>About</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Tell us about you as an artist" value={artistForm?.about} onChange={handleChange} />
                    <FormErrorMessages errors={errors.about} />
                </Form.Group>
                
                <Tags artist={artist} isEnsemble={isEnsemble} />

            {showAlert ? (
                <Alert key="success" variant="success">
                    All changes have been successfully saved!
                </Alert>
            ) :             
                <div className="submit-btn-container">
                    <Button variant="danger" type="submit">Submit</Button>
                </div>
            }

            </Form>
        </>
    );
};
  
export default ArtistForm;
  