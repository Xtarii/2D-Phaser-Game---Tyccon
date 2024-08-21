/**
 * Role Type
 */
type Role = "host" | "client"
/**
 * Location Type
 */
export type Location = {
    /**
     * Location X Position
     */
    x: number
    /**
     * Location Y Position
     */
    y: number

    /**
     * Location Level
     */
    l: number | string
}





/**
 * Runtime Data Namespace
 */
export namespace Runtime {
    /**
     * Runtime Player Data Namespace
     */
    export namespace Player {
        /**
         * Player Role
         */
        let _role: Role = "client"
        /**
         * Player Location
         */
        let _location: Location = { x: 0, y: 0, l: 0 }



        /**
         * Sets Player Runtime Data Position
         *
         * Sets Player X, Y and Level Position.
         * The X pos and Y pos is normal
         * world Position while L is the
         * level or map name - determining
         * if the Player if visible to other
         * players or entities.
         *
         * @param x X Position
         * @param y Y Position
         * @param l Level or Map
         */
        export function setLocation(x: number, y: number, l: number | string) {_location = { x, y, l }}
        /**
         * Gets Player Runtime Location
         *
         * Gets player X, Y and Level
         * position of the player.
         *
         * @returns Player Location
         */
        export function getLocation() : Location { return _location }

        /**
         * Sets Player Role
         *
         * @param role Role
         */
        export function setRole(role: Role) { _role = role }
        /**
         * Gets Player Role
         *
         * @returns Role
         */
        export function getRole() : Role { return _role }
    }
}
