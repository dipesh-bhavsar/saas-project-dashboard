const Database=require('better-sqlite3'),path=require('path'),fs=require('fs');
const DB_PATH=process.env.DB_PATH||'./data/dashboard.db';
let db;
function getDb(){if(!db){fs.mkdirSync(path.dirname(DB_PATH),{recursive:true});db=new Database(DB_PATH);db.pragma('journal_mode = WAL');}return db;}
function initDb(){getDb().exec(`CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,email TEXT UNIQUE NOT NULL,password_hash TEXT NOT NULL,name TEXT);CREATE TABLE IF NOT EXISTS projects(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,client TEXT,status TEXT DEFAULT 'amber',budget_total REAL DEFAULT 0,budget_used REAL DEFAULT 0,sprint_velocity INTEGER DEFAULT 0,risk_count INTEGER DEFAULT 0,start_date TEXT,end_date TEXT,owner_id INTEGER,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);console.log('DB ready');}
module.exports={getDb,initDb};
