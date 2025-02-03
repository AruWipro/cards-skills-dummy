const { SLOTS } = require('../constants/constants');

class CardModel {
    constructor() {
        this.context = {
            [SLOTS.CARD_NUMBER]: {value:null, attempts:0},
            [SLOTS.EXPIRY_DATE]: {value:null, attempts:0},
            [SLOTS.CVV]: {value:null, attempts:0},
            [SLOTS.PIN]: {value:null, attempts:0},
            [SLOTS.ACCOUNT_TYPE]: {value:null, attempts:0},
            [SLOTS.ACCOUNT_NUMBER]: {value:null, attempts:0},
            current_slot:'',
            current_attempt: 0,
        };
    }

    getContext() {
        return this.context;
    }

    updateContext(slot, value) {
        if (!this.context[slot].value) {
            this.context.current_slot = slot;
            this.context[slot].value = value;
            this.context[slot].attempts++;
        }
    }

    resetContext() {
        this.context = {
            [SLOTS.CARD_NUMBER]: {value:null, attempts:0},
            [SLOTS.EXPIRY_DATE]: {value:null, attempts:0},
            [SLOTS.CVV]: {value:null, attempts:0},
            [SLOTS.PIN]: {value:null, attempts:0},
            [SLOTS.ACCOUNT_TYPE]: {value:null, attempts:0},
            [SLOTS.ACCOUNT_NUMBER]: {value:null, attempts:0},
            current_slot:'',
            current_attempt: 0,
        };
    }

    isSlotFilled(slot) {
        return this.context[slot] !== null;
    }

    isAllSlotsFilled() {
        return Object.values(this.context).every(obj => {if(obj.value) return true; else false});
    }
}

module.exports = new CardModel();
