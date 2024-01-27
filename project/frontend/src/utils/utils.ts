import {ChangeEvent} from "react";

export function getOnFieldChange(setter: (v: string) => void) {
    return (e: ChangeEvent<HTMLInputElement>) => setter((e.currentTarget as HTMLInputElement).value);
}

export function getOnIntFieldChange(setter: (v: number) => void) {
    return (e: ChangeEvent<HTMLInputElement>) => setter(Number.parseInt((e.currentTarget as HTMLInputElement).value));
}

export function randomInt(min: number = 0, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getEnumKeys(myEnum: any): string[] {
    return Object.keys(myEnum).map(key => myEnum[key]).filter(value => typeof value === 'string') as string[];
}

export function getEnumKey(value: string, myEnum: any) {
    return Object.keys(myEnum).filter(key => value === myEnum[key])[0];
}

export function fromObject(o: any, type: any): any {
    const cloneObj = new type();
    for (const attribute in o) {
        (cloneObj as any)[attribute] = o[attribute]
    }
    return cloneObj;
}

// export function getHashCode(str: string) {
//     // const hash = crypto.getHashes();
//     return crypto.createHash('MD5').update(str).digest('hex');
// }
