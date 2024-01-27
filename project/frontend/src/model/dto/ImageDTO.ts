import ImageAction, {StubAction} from "../util/ImageAction";

export default class ImageDTO {
    constructor(public readonly id: string, public readonly content: string, public action?: ImageAction) {
    }

    public get pinned(): boolean {
        return this.action === undefined;
    }

    public act(images: ImageDTO[]) {
        this.action?.act(images, this)
    }

    static pinImage(images: ImageDTO[], image: ImageDTO, defaultAction = StubAction): ImageDTO[] {
        const newImages = images.filter(i => i !== image);
        newImages.forEach(i => i.action = defaultAction);
        newImages.unshift(image);
        delete image.action;
        return newImages;
    }
}
