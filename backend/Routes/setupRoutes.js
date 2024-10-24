
const adminRouter=require('./Admin/admin')
const userRouter=require('./User/user')



exports.setupRoutes=(app)=>{
    app.use('/user',userRouter)
    app.use('/admin',adminRouter)
    
}