/**
 * Interaction List Type
 */
type InteractionMap = {object: Phaser.GameObjects.Sprite, callback: () => void}[]

/**
 * Interactable Objects List
 */
let InteractableObjects: InteractionMap = []





/**
 * Interactable GameObjects in the Scene
 */
export const getInteractableObjects = (): InteractionMap => [...InteractableObjects]

/**
 * Stores Object as Interactable and Callback as event handler
 *
 * @param object Interact Object
 * @param callback Callback
 */
export function addInteractableObject(object: Phaser.GameObjects.Sprite, callback: () => void) {
    InteractableObjects.push({object, callback})
}

/**
 * Removes Interactable Object from "Interactables"
 *
 * Should not be called when modifying list, or
 * if one callback is to be removed then
 * {@link removeInteractableObjectCallback} should be called.
 *
 * @param object Interactable Object to Remove
 */
export function removeInteractableObject(object: Phaser.GameObjects.Sprite) {
    const newList = []

    for(var i in InteractableObjects) {
        if(InteractableObjects[i].object === object) continue // Skips this object
        newList.push(InteractableObjects[i]) // Adds Object to new List
    }
    InteractableObjects = newList // Set Interactable Object List to new List
}

/**
 * Removes callback from {@link object} in Interactables
 *
 * Only removes callback, if all callbacks should be removes use
 * {@link removeInteractableObject}
 *
 * @param object Callback owner
 * @param callback Callback
 */
export function removeInteractableObjectCallback(object: Phaser.GameObjects.Sprite, callback: () => void) {
    const newList = []

    for(var i in InteractableObjects) {
        if(InteractableObjects[i].object === object && InteractableObjects[i].callback === callback) continue
        newList.push(InteractableObjects[i]) // Adds Object to new List
    }
    InteractableObjects = newList // Set Interactable Object List to new List
}
