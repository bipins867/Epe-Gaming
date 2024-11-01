
const adminRouter=require('./Admin/admin')
const userRouter=require('./User/user')
const filesRouter=require('./Files/files')


exports.setupRoutes=(app)=>{
    app.use('/files',filesRouter)
    app.use('/user',userRouter)
    app.use('/admin',adminRouter)
    
}