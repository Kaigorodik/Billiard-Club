import ImageDTO from "../dto/ImageDTO";
import React from "react";

export default interface ImageAction {
    readonly actionTooltip: string
    readonly icon: React.ReactNode

    act(images: ImageDTO[], image: ImageDTO): void
}

const StubAction: ImageAction = {
    actionTooltip: '',
    icon: <></>,

    act() {
    }
}

export {StubAction}
