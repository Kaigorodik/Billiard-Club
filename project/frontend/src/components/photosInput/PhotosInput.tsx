import * as React from 'react';
import {Button} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Dropzone from 'react-dropzone'
import classes from './PhotosInput.module.scss';
import {toSrc} from "../../utils/fileUtils";
import {ImagesViewer} from "./ImagesViewer";
import ImageDTO from "../../model/dto/ImageDTO";
import {StarBorder} from "@mui/icons-material";
import ImageAction from "../../model/util/ImageAction";
import {v4 as uuidv4} from 'uuid';

interface PhotosProps {
    images?: ImageDTO[]
    onSetImages(images: ImageDTO[]): void
}

export default function PhotosInput({images = [], onSetImages}: PhotosProps) {
    // const [images, setImages] = useState([] as ImageDTO[]);

    const pinAction: ImageAction = {
        actionTooltip: 'Выбрать в качестве основной',
        icon: <StarBorder sx={{color: 'white'}}/>,
        act(images: ImageDTO[], image: ImageDTO) {
            const newImages = ImageDTO.pinImage(images, image, pinAction);
            onSetImages(newImages);
        }
    }

    const onFileAdded = ([acceptedFile]: File[]) => //TODO: check format
        toSrc(acceptedFile).then(s => onSetImages([...images,
            new ImageDTO(uuidv4(), s, images.length ? pinAction : undefined)]));

    const onFileRemoved = (image: ImageDTO) => {
        const newImages = images.filter(i => i.id !== image.id);
        if (newImages.length > 0)
            delete newImages[0].action;
        onSetImages(newImages);
    };

    return (<>
        <ImagesViewer images={images} onRemove={onFileRemoved}/>
        <Button className={classes.dropZoneButton} variant='outlined' color='inherit'>
            <Dropzone maxFiles={1} onDrop={onFileAdded}>
                {({getRootProps, getInputProps}) => (
                    <section {...getRootProps()} className={classes.fileSection}>
                        <input data-testid='photo-input' {...getInputProps()}/>
                        <FileUploadIcon fontSize='large'/>
                        Загрузить фото
                        <FileUploadIcon fontSize='large'/>
                    </section>
                )}
            </Dropzone>
        </Button>
    </>);
}
