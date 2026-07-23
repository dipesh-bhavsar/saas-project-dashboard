const C={green:'#27ae60',amber:'#f39c12',red:'#e74c3c'};
export default function ProjectCard({project:p}){
  const util=p.budget_total>0?Math.round(p.budget_used/p.budget_total*100):0;
  return(<div style={{border:`2px solid ${C[p.status]||'#ccc'}`,borderRadius:10,padding:16}}><div style={{display:'flex',justifyContent:'space-between'}}><h3 style={{margin:0}}>{p.name}</h3><span style={{background:C[p.status],color:'#fff',borderRadius:4,padding:'2px 8px',fontSize:12}}>{p.status.toUpperCase()}</span></div><div style={{color:'#666',fontSize:13}}>{p.client}</div><div style={{marginTop:10,display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,fontSize:13}}><div>Budget {util}%</div><div>Velocity {p.sprint_velocity} pts</div><div>Risks {p.risk_count}</div><div>End {p.end_date||'—'}</div></div></div>);
}
