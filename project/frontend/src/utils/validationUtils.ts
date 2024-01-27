import React from "react";

export function correctNumericInput(e: React.FormEvent<HTMLDivElement>) {
    const target = (e.target as HTMLInputElement);
    const val = parseInt(target.value);
    if (val < 1) {
        target.value = '1';
        return 1;
    }
    return val;
}

export function orDefault<T>(value: T | undefined | null, def: T): T {
    return value ? value : def;
}

export function correctScoreInput(e: React.FormEvent<HTMLDivElement>) {
    const target = (e.target as HTMLInputElement);
    const val = parseInt(target.value);
    if (val < 0) {
        target.value = '0';
        return 0;
    }
    if (val > 5) {
        target.value = '5';
        return 5;
    }
    return val;
}


const pattern = /^[\w\s\-а-яёА-ЯЁ]*$/;

export function isValid(text: string) {
    return pattern.test(text);
}

export function allNotEmpty(...values: any[]) {
    return values.every(e => e && e.length > 0);
}
