/**
 * Intractable Object Type
 *
 * All objects that use the "default" interact system
 * implements this intractable interface.
 */
export interface Intractable {
    /**
     * Interaction delay
     *
     * The delay before an interaction can
     * happen again right after an interaction.
     */
    delay: number



    /**
     * Interact Function
     *
     * This function gets called when
     * something interacts with this object.
     */
    interact: () => void
}
