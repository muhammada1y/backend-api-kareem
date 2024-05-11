import jwt from 'jsonwebtoken'


const token = (res,userId)=>{
    const jToken = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
    res.cookie('jwt',jToken,{
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'devlopment',
        sameSet: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30day
        
    })
}


export default token;