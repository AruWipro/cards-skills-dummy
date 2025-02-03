// const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const cardService = require('../services/cardService');

exports.activateCard = [
    body('rawText').isString(),
    body('intent').isString().notEmpty(),
    body('origin').isString().isIn(['ivr-dtmf', 'ivr-conv', 'wap']),
    body('cardNumber').optional().isString(),
    body('expiryDate').optional().isString(),
    body('cvv').optional().isString(),
    body('pin').optional().isString(),
    body('accountType').optional().isString(),
    body('accountNumber').optional().isString(),

    async (req, res) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        const payload = req.body;
        const result = await cardService.processRequest(payload);

        res.json({
            action: result.action,
            message: result.message,
            requiredSlot: result.requiredSlot,
            currentAttempt: result.currentAttempt
        });
    }
];
