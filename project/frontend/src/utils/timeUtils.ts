/**
 * @param time in format 'HH:mm'
 */
export function getTotalMinutes(time: string) {
    const components = time.split(':').map(c => Number.parseInt(c));
    return components[0] * 60 + components[1];
}

/**
 * @param date - ISO date time
 * @return time in format 'HH:mm'
 */
export function extractTimeFromISO(date: string | null | undefined) {
    return date ? date.split('T')[1].substring(0, 5) : date;
}

/**
 * @param date - ISO date time
 * @return date in format 'YYYY-MM-DD'
 */
export function extractDateFromISO(date: string) {
    return date.substring(0, 10);
}

export function addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}