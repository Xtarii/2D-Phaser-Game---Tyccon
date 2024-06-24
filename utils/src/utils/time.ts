/**
 * Sleep Function
 *
 * ```js
 * await sleep(1000) // 1 second sleep
 * ```
 *
 * @param ms Milliseconds
 * @returns Promise
 */
export function sleep(ms: number): Promise<null> {
    return new Promise(resolve => setTimeout(resolve, ms))
}
