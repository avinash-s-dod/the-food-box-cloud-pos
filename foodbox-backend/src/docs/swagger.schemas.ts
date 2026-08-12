/**
 * @swagger
 * components:
 *   schemas:
 *
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - isActive
 *         - isDeleted
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           example: "64f123abc456def789012345"
 *         name:
 *           type: string
 *           example: "Burgers"
 *         description:
 *           type: string
 *           example: "Delicious freshly prepared burgers"
 *         image:
 *           type: string
 *           example: "https://example.com/burger.jpg"
 *         isActive:
 *           type: boolean
 *           example: true
 *         isDeleted:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-08-12T10:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-08-12T10:30:00.000Z"
 *
 *     CreateCategory:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "Burgers"
 *         description:
 *           type: string
 *           maxLength: 200
 *           example: "Delicious freshly prepared burgers"
 *         image:
 *           type: string
 *           example: "https://example.com/burger.jpg"
 *
 *     UpdateCategory:
 *       type: object
 *       additionalProperties: false
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "Premium Burgers"
 *         description:
 *           type: string
 *           maxLength: 200
 *           example: "Updated burger description"
 *         image:
 *           type: string
 *           example: "https://example.com/new-burger.jpg"
 *
 *     Menu:
 *       type: object
 *       required:
 *         - id
 *         - category
 *         - name
 *         - price
 *         - preparationTime
 *         - isAvailable
 *         - isDeleted
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           example: "64f123abc456def789012346"
 *         category:
 *           type: string
 *           example: "64f123abc456def789012345"
 *         name:
 *           type: string
 *           example: "Cheese Pizza"
 *         description:
 *           type: string
 *           example: "Delicious pizza with loaded extra cheese"
 *         image:
 *           type: string
 *           example: "https://example.com/pizza.jpg"
 *         price:
 *           type: number
 *           example: 299
 *         preparationTime:
 *           type: number
 *           example: 20
 *         isAvailable:
 *           type: boolean
 *           example: true
 *         isDeleted:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-08-12T10:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-08-12T10:30:00.000Z"
 * 
 *     CreateMenu:
 *       type: object
 *       required:
 *         - category
 *         - name
 *         - price
 *       properties:
 *         category:
 *           type: string
 *           example: "64f123abc456def789012345"
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "Cheese Pizza"
 *         description:
 *           type: string
 *           maxLength: 200
 *           example: "Delicious pizza with loaded extra cheese"
 *         image:
 *           type: string
 *           example: "https://example.com/pizza.jpg"
 *         price:
 *           type: number
 *           minimum: 0
 *           example: 299
 *         preparationTime:
 *           type: number
 *           minimum: 15
 *           example: 20
 * 
 *     UpdateMenu:
 *       type: object
 *       additionalProperties: false
 *       properties:
 *         category:
 *           type: string
 *           example: "64f123abc456def789012345"
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "Cheese Pizza"
 *         description:
 *           type: string
 *           maxLength: 200
 *           example: "Delicious pizza with loaded extra cheese"
 *         image:
 *           type: string
 *           example: "https://example.com/pizza.jpg"
 *         price:
 *           type: number
 *           minimum: 0
 *           example: 320
 *         preparationTime:
 *           type: number
 *           minimum: 15
 *           example: 20
 *         isAvailable:
 *           type: boolean
 *           example: true
 *
 *     Order:
 *       type: object
 *       required:
 *         - id
 *         - customerName
 *         - phone
 *         - address
 *         - items
 *         - subtotal
 *         - deliveryCharge
 *         - grandTotal
 *         - orderStatus
 *         - paymentStatus
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           example: "64f123abc456def789012347"
 *         userId:
 *           type: string
 *           example: "64f123abc456def789012345"
 *         customerName:
 *           type: string
 *           example: "John Doe"
 *         phone:
 *           type: string
 *           example: "9876543210"
 *         address:
 *           type: string
 *           example: "Gwalior, Madhya Pradesh"
 *         notes:
 *           type: string
 *           example: "Leave at gate"
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - menuId
 *               - name
 *               - price
 *               - quantity
 *               - subtotal
 *             properties:
 *               menuId:
 *                 type: string
 *                 example: "64f123abc456def789012346"
 *               name:
 *                 type: string
 *                 example: "Cheese Pizza"
 *               price:
 *                 type: number
 *                 example: 299
 *               quantity:
 *                 type: number
 *                 example: 2
 *               subtotal:
 *                 type: number
 *                 example: 598
 *         subtotal:
 *           type: number
 *           example: 598
 *         deliveryCharge:
 *           type: number
 *           example: 40
 *         grandTotal:
 *           type: number
 *           example: 638
 *         orderStatus:
 *           type: string
 *           enum: [PLACED, CONFIRMED, OUT_FOR_DELIVERY, DELIVERED, CANCELLED]
 *           example: "PLACED"
 *         paymentStatus:
 *           type: string
 *           enum: [PENDING, PAID, REFUNDED]
 *           example: "PENDING"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-08-12T10:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-08-12T10:30:00.000Z"
 * 
 *     CreateOrder:
 *       type: object
 *       required:
 *         - customerName
 *         - phone
 *         - address
 *         - items
 *       properties:
 *         customerName:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "John Doe"
 *         phone:
 *           type: string
 *           pattern: "^[0-9]{10}$"
 *           example: "9876543210"
 *         address:
 *           type: string
 *           minLength: 10
 *           maxLength: 200
 *           example: "Gwalior, Madhya Pradesh"
 *         notes:
 *           type: string
 *           maxLength: 200
 *           example: "Leave at gate"
 *         items:
 *           type: array
 *           minItems: 1
 *           items:
 *             type: object
 *             required:
 *               - menuId
 *               - quantity
 *             properties:
 *               menuId:
 *                 type: string
 *                 example: "64f123abc456def789012346"
 *               quantity:
 *                 type: number
 *                 minimum: 1
 *                 example: 2
 * 
 *     UpdateOrder:
 *       type: object
 *       required:
 *         - orderStatus
 *       properties:
 *         orderStatus:
 *           type: string
 *           enum: [PLACED, CONFIRMED, OUT_FOR_DELIVERY, DELIVERED, CANCELLED]
 *           example: "CONFIRMED"
 *
 *     Customer:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - phone
 *         - role
 *         - isDeleted
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           example: "64f123abc456def789012345"
 *         name:
 *           type: string
 *           example: "John Doe"
 *         phone:
 *           type: string
 *           example: "9876543210"
 *         email:
 *           type: string
 *           example: "johndoe@example.com"
 *         role:
 *           type: string
 *           enum: [USER]
 *           example: "USER"
 *         isDeleted:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-08-12T10:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-08-12T10:30:00.000Z"
 * 
 *     CreateCustomer:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "John Doe"
 *         phone:
 *           type: string
 *           pattern: "^[0-9]{10}$"
 *           example: "9876543210"
 *         email:
 *           type: string
 *           format: email
 *           example: "johndoe@example.com"
 *         password:
 *           type: string
 *           minLength: 6
 *           example: "securepass123"
 * 
 *     UpdateCustomer:
 *       type: object
 *       additionalProperties: false
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "John Smith"
 *         phone:
 *           type: string
 *           pattern: "^[0-9]{10}$"
 *           example: "9876543211"
 *         email:
 *           type: string
 *           format: email
 *           example: "johnsmith@example.com"
 * 
 *     CustomerLogin:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         phone:
 *           type: string
 *           pattern: "^[0-9]{10}$"
 *           example: "9876543210"
 *         email:
 *           type: string
 *           format: email
 *           example: "johndoe@example.com"
 *         password:
 *           type: string
 *           minLength: 6
 *           example: "securepass123"
 * 
 *     CustomerResponse:
 *       type: object
 *       required:
 *         - token
 *         - customer
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         customer:
 *           $ref: "#/components/schemas/Customer"
 *
 *     RestaurantInfo:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - address
 *       properties:
 *         name:
 *           type: string
 *           example: FoodBox
 *         phone:
 *           type: string
 *           example: "9876543210"
 *         address:
 *           type: string
 *           example: "Gwalior, Madhya Pradesh"
 *
 *     OpeningDay:
 *       type: object
 *       required:
 *         - isOpen
 *       properties:
 *         isOpen:
 *           type: boolean
 *           example: true
 *         openTime:
 *           type: string
 *           pattern: "^([01]\\d|2[0-3]):([0-5]\\d)$"
 *           example: "10:00"
 *         closeTime:
 *           type: string
 *           pattern: "^([01]\\d|2[0-3]):([0-5]\\d)$"
 *           example: "22:00"
 *
 *     OpeningHours:
 *       type: object
 *       required:
 *         - MONDAY
 *         - TUESDAY
 *         - WEDNESDAY
 *         - THURSDAY
 *         - FRIDAY
 *         - SATURDAY
 *         - SUNDAY
 *       properties:
 *         MONDAY:
 *           $ref: "#/components/schemas/OpeningDay"
 *         TUESDAY:
 *           $ref: "#/components/schemas/OpeningDay"
 *         WEDNESDAY:
 *           $ref: "#/components/schemas/OpeningDay"
 *         THURSDAY:
 *           $ref: "#/components/schemas/OpeningDay"
 *         FRIDAY:
 *           $ref: "#/components/schemas/OpeningDay"
 *         SATURDAY:
 *           $ref: "#/components/schemas/OpeningDay"
 *         SUNDAY:
 *           $ref: "#/components/schemas/OpeningDay"
 *
 *     CreateSettings:
 *       type: object
 *       required:
 *         - deliveryCharge
 *         - restaurant
 *         - openingHours
 *       properties:
 *         deliveryCharge:
 *           type: number
 *           minimum: 0
 *           example: 40
 *         restaurant:
 *           $ref: "#/components/schemas/RestaurantInfo"
 *         openingHours:
 *           $ref: "#/components/schemas/OpeningHours"
 *
 *     UpdateSettings:
 *       type: object
 *       additionalProperties: false
 *       properties:
 *         deliveryCharge:
 *           type: number
 *           minimum: 0
 *           example: 50
 *         restaurant:
 *           $ref: "#/components/schemas/RestaurantInfo"
 *         openingHours:
 *           $ref: "#/components/schemas/OpeningHours"
 */
