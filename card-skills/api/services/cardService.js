const { MESSAGES, SLOTS } = require('../constants/constants');
const { getContext } = require('../models/cardModel');
const cardModel = require('../models/cardModel');

class CardService {
    async processRequest(payload) {
        const { rawText, origin, intent, slots } = payload;

        let action = 'COLLECT_INPUT';
        let responseMessage = '';
        let requiredSlot = '';

        const context = cardModel.getContext();

        if (intent === 'ActivateCard') {
            if (!context[SLOTS.CARD_NUMBER].value) {
                cardModel.updateContext(SLOTS.CARD_NUMBER, slots[SLOTS.CARD_NUMBER]);
                responseMessage = MESSAGES.REQUEST_EXPIRY_DATE.replace('{{cardNumber}}', slots[SLOTS.CARD_NUMBER]);
                requiredSlot = SLOTS.EXPIRY_DATE;
            } else if (!context[SLOTS.EXPIRY_DATE].value) {
                cardModel.updateContext(SLOTS.EXPIRY_DATE, slots[SLOTS.EXPIRY_DATE]);
                if (slots[SLOTS.EXPIRY_DATE]) {
                    responseMessage = MESSAGES.REQUEST_CVV.replace('{{cardNumber}}', context[SLOTS.CARD_NUMBER]);
                    requiredSlot = SLOTS.CVV
                }
                else {
                    responseMessage = MESSAGES.REQUEST_EXPIRY_DATE.replace('{{cardNumber}}', slots[SLOTS.CARD_NUMBER]);
                    requiredSlot = SLOTS.EXPIRY_DATE;
                };
            } else if (!context[SLOTS.CVV].value) {
                cardModel.updateContext(SLOTS.CVV, slots[SLOTS.CVV]);
                responseMessage = MESSAGES.REQUEST_PIN.replace('{{cardNumber}}', context[SLOTS.CARD_NUMBER]);
                requiredSlot = SLOTS.PIN;
            } else if (!context[SLOTS.PIN].value) {
                cardModel.updateContext(SLOTS.PIN, slots[SLOTS.PIN]);
                responseMessage = MESSAGES.END;
                action = 'END';
            }
            
            if (context[context.current_slot].attempts > 3 || cardModel.isAllSlotsFilled()) {
                cardModel.resetContext()
                responseMessage = MESSAGES.TOO_MANY_ATTEMPTS
                action = 'END';
            }
        }

        return { action, message: responseMessage, requiredSlot, currentAttempt: context[context.current_slot].attempts};
    }
}

module.exports = new CardService();
