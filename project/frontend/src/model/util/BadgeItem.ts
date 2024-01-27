import ClubItemDto from "../dto/ClubItemDto";

export default class BadgeItem {
    constructor(public title: string, public description: string, public label: string,
                public backgroundUrl: string, public href: string) {
    }

    static fromClubInfo(clubInfo: ClubItemDto): BadgeItem {
        return new BadgeItem(clubInfo.title, clubInfo.address, `Средняя цена: ${clubInfo.priceMean}`,
            clubInfo.avatar, `/club?clubId=${clubInfo.id}`);
    }
}
