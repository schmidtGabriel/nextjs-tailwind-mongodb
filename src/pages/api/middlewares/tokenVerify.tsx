
import jwt  from 'jsonwebtoken';

 async function middlewareTokenVerify(authorization, req, res){

    if(!authorization)
    return res.status(401).json({success: false, msg: 'No token provider'})

    const parts = authorization.split(' ');
    if(parts.length !== 2)
    return res.status(401).json({success: false, msg: 'Token Error'})

    if(!/^DoNada$/i.test(parts[0]))
    return res.status(401).json({sucess: false, msg: 'Token bad formatted'})

    jwt.verify(parts[1], process.env.SECRET_KEY , (err, decoded) => {
        if(err) return res.status(401).json({success: false, msg: 'Token invalid'})
        
        req.userId = decoded.params.id;
        return true
    })
    
 }

 export default middlewareTokenVerify