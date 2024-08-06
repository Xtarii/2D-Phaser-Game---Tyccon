const DEFAULT: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '10px',
    fontFamily: 'standard galactic',
    color: '#efefef',
    backgroundColor: '#2d2f2e5e',
    resolution: 2
}
const BUTTON_NORMAL: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '10px',
    fontFamily: 'standard galactic',
    color: '#efefef',
    resolution: 2
}
const ENTITY_NAMES: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '50px',
    fontFamily: 'Arial',
    color: '#cfcfcf',
    backgroundColor: '#2d2f2e5e',
    resolution: 2
}
const BUTTON_MEDIUM_SIZE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '7px',
    fontFamily: 'standard galactic',
    color: '#efefef',
    resolution: 2
}



/**
 * Text Object Styles
 */
export const styles = {
    /**
     * Standard Text Style
     *
     * The Default text style for Text Objects
     */
    DEFAULT,
    /**
     * Text Style for Buttons
     *
     * No text background is created.
     */
    BUTTON_NORMAL,
    /**
     * Text Style for Entity names
     *
     * Uses the Arial Font Family and
     * a bigger text size.
     */
    ENTITY_NAMES,

    /**
     * Medium Text Style for Buttons
     *
     * No text background is created.
     * This has a smaller font size
     * compared to {@link BUTTON_NORMAL}
     */
    BUTTON_MEDIUM_SIZE,
}
