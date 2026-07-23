const{WebSocketServer}=require('ws');const clients=new Set();let wss;
function setupWss(server){wss=new WebSocketServer({server,path:'/ws'});wss.on('connection',ws=>{clients.add(ws);ws.on('close',()=>clients.delete(ws));});}
function broadcast(payload){const msg=JSON.stringify(payload);for(const c of clients)if(c.readyState===1)c.send(msg);}
module.exports={setupWss,broadcast};
