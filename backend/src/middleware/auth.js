const jwt=require('jsonwebtoken');
function requireAuth(req,res,next){const h=req.headers.authorization;if(!h?.startsWith('Bearer '))return res.status(401).json({error:'Auth required'});try{req.user=jwt.verify(h.slice(7),process.env.JWT_SECRET||'dev');next();}catch{res.status(401).json({error:'Invalid token'});}}
module.exports={requireAuth};
