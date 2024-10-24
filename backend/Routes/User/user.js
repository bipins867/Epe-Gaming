
const express=require('express')

const categoriesRouter=require('./Categories/categories')
const gamesRouter=require('./Games/games')
const eventsRouter=require('./Event/events')
const authRouter=require('./Auth/auth');

const router=express.Router();

router.use('/categories',categoriesRouter)
router.use('/games',gamesRouter)
router.use('/events',eventsRouter)
router.use('/auth',authRouter)


module.exports=router;