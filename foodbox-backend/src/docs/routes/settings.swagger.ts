/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Get restaurant settings
 *     tags:
 *       - Settings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Settings fetched successfully
 *       404:
 *         description: Settings not found
 */

/**
 * @swagger
 * /api/settings:
 *   post:
 *     summary: Create restaurant settings
 *     description: Creates the initial restaurant settings.
 *     tags:
 *       - Settings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateSettings"
 *     responses:
 *       201:
 *         description: Settings created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       409:
 *         description: Settings already configured
 */

/**
 * @swagger
 * /api/settings:
 *   patch:
 *     summary: Update restaurant settings
 *     tags:
 *       - Settings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateSettings"
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Settings not found
 */
