import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Clear} from "@mui/icons-material";
import * as React from "react";
import ImageDTO from "../../model/dto/ImageDTO";
import classes from './PhotosInput.module.scss';
import Conditional from "../Conditional";

interface ImagesProps {
    images: ImageDTO[]
    onRemove?: (image: ImageDTO) => void
    baseWidth?: number
    baseHeight?: number
    scaleCoefficient?: number
    variant?: 'masonry' | 'quilted' | 'standard' | 'woven' | undefined
    onImageClick?: (image: ImageDTO) => void
}

export function ImagesViewer({images, onImageClick, onRemove, variant, baseWidth = 125, baseHeight = 100, scaleCoefficient = 4}: ImagesProps) {
    return (
        <ImageList rowHeight={baseHeight} gap={1} variant={variant}>
            {images.map(item => {
                const size = item.pinned ? scaleCoefficient : 1;

                return (
                    <ImageListItem key={item.id} cols={size} rows={size}>
                        <img onClick={() => onImageClick?.(item)} src={item.content} style={{
                            maxWidth: baseWidth * size,
                            maxHeight: baseHeight * size,
                            cursor: onImageClick && !item.pinned ? 'pointer' : 'auto'
                        }} width={baseWidth * size} height={baseHeight * size} loading="lazy" alt='Фото клуба'/>
                        <ImageListItemBar
                            sx={{background: 'none'}} // title={}
                            position="top"
                            actionPosition="left"
                            actionIcon={
                                <>
                                    <Conditional condition={!item.pinned}>
                                        <Tooltip title={item.action?.actionTooltip as string}>
                                            <IconButton className={classes.actionIcon} onClick={() => item.act(images)}>
                                                {item.action?.icon}
                                            </IconButton>
                                        </Tooltip>
                                    </Conditional>
                                    <Conditional condition={onRemove !== undefined}>
                                        <Tooltip title='Удалить'>
                                            <IconButton onClick={() => onRemove?.(item)}>
                                                <Clear className={classes.iconButton}/>
                                            </IconButton>
                                        </Tooltip>
                                    </Conditional>
                                </>
                            }/>
                    </ImageListItem>);
            })}
        </ImageList>
    );
}
