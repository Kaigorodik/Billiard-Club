export interface ICard {
    padding: string
    margin: string
    background: string
}

export interface ICardProps {
    padding?: string
    margin?: string
    background?: string
}

const card = {
    padding: '15px',
    margin: '7px 0',
    background: 'rgba(255, 255, 255, 0.5)',
};

export default card;
