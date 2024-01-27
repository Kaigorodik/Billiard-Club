export interface HeaderProps {
    links?: HeaderLink[]
}

export class HeaderLink {
    constructor(public title: string, public url: string) {
    }
}
