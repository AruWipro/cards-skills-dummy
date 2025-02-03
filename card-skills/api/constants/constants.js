module.exports = {
    MAX_ATTEMPTS: 3,
    SLOTS: {
        CARD_NUMBER: 'cardNumber',
        EXPIRY_DATE: 'exp',
        CVV: 'cvv',
        PIN: 'pin',
        ACCOUNT_TYPE: 'accountType',
        ACCOUNT_NUMBER: 'accountNumber',
    },
    ORIGINS: {
        IVR_DTMF: 'ivr-dtmf',
        IVR_CONV: 'ivr-conv',
        WAP: 'wap',
    },
    MESSAGES: {
        REQUEST_CARD_NUMBER: 'Please select the card number.',
        REQUEST_EXPIRY_DATE: 'Please enter the expiry date for the card ending {{cardNumber}} in MMYY format.',
        REQUEST_CVV: 'Please enter the CVV for the card ending {{cardNumber}}.',
        REQUEST_PIN: 'Please enter the PIN for the card ending {{cardNumber}}.',
        END: 'All required information has been collected. Your card has been activated.',
        ERROR: 'There was an error processing your request.',
        TOO_MANY_ATTEMPTS: 'There were too many attempts for the same slot.'
    },
};
