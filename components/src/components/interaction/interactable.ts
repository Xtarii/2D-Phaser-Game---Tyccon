/**
 * Interactable Object Type
 *
 * All objects that use the "default" interact system
 * implements this interactable interface.
 */
export interface Interactable {
    /**
     * Interact Function
     *
     * This function gets called when
     * something interacts with this object.
     */
    interact: () => void
}
