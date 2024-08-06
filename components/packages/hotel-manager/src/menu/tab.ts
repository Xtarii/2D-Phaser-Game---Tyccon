import { Panel } from "@obesity-components/gui"



/**
 * Tab Namespace
 */
export namespace Tab {
    /**
     * Menu Tab Type
     */
    export type Tab = {
        /**
         * Tab Class
         *
         * The Tabs Controller
         */
        tab: new (parent: Panel, id: number) => TabObject

        /**
         * Tab Icon
         */
        icon: string
    }

    /**
     * Tab Size
     *
     * The Size of the Tabs
     * ```
     * x: number
     * y: number
     * ```
     */
    export const tabSize: {x: number, y: number} = {x: 50, y: 25}
    /**
     * Tab Icon Size
     *
     * The Size of the Tab Icon
     * ```
     * x: number
     * y: number
     * ```
     */
    export const tabIconSize: {x: number, y: number} = { x: 16, y: 16 }



    /**
     * Tab Object
     */
    export abstract class TabObject {
        /**
         * Tab Parent Object
         */
        protected parent: Panel
        /**
         * Tab ID
         *
         * Used to get Tab instance
         * of the tab list in menu.
         */
        readonly id: number

        /**
         * Creates a Tab
         *
         * @param parent Parent
         * @param id Tab ID
         */
        constructor(parent: Panel, id: number) {
            this.parent = parent // Sets Parent
            this.id = id // Sets ID
        }



        /**
         * Tab Open Event
         *
         * This gets called when the tab is
         * getting opened.
         */
        abstract open(): void
        /**
         * Tab Close Event
         *
         * This gets called when the tab is
         * getting closed.
         */
        abstract close(): void
    }
}
