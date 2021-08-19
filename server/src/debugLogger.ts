const isDebugActive = false;

export function debug(message: string): void {
    if (isDebugActive) console.log(message);
}