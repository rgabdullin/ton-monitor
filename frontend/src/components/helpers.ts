import { texts } from './texts';

export const getText = (key: string) => {
    return texts[key] || "";
}