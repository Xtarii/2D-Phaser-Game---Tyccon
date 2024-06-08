/**
 * Sleep Function
 *
 * ```js
 * await sleep(1000) // 1 second sleep
 * ```
 *
 * @param {number} ms Milliseconds
 * @returns Promise
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
