const express=require('express'),bcrypt=require('bcryptjs'),jwt=require('jsonwebtoken'),{getDb}=require('../db'),{z}=require('zod');
const router=express.Router(),SECRET=process.env.JWT_SECRET||'dev';
const Schema=z.object({email:z.string().email(),password:z.string().min(8),name:z.string().optional()});
router.post('/register',(req,res)=>{const p=Schema.safeParse(req.body);if(!p.success)return res.status(400).json({error:p.error.flatten()});const{email,password,name}=p.data;try{const r=getDb().prepare('INSERT INTO users(email,password_hash,name)VALUES(?,?,?)').run(email,bcrypt.hashSync(password,10),name||'');res.status(201).json({token:jwt.sign({userId:r.lastInsertRowid,email},SECRET,{expiresIn:'7d'})});}catch(e){if(e.message.includes('UNIQUE'))return res.status(409).json({error:'Email exists'});throw e;}});
router.post('/login',(req,res)=>{const{email,password}=req.body;const user=getDb().prepare('SELECT * FROM users WHERE email=?').get(email);if(!user||!bcrypt.compareSync(password,user.password_hash))return res.status(401).json({error:'Invalid credentials'});res.json({token:jwt.sign({userId:user.id,email},SECRET,{expiresIn:'7d'}),name:user.name});});
module.exports=router;
