export default function KpiBar({totalBudget,usedBudget,redCount,projectCount}){
  const util=totalBudget>0?Math.round(usedBudget/totalBudget*100):0;
  const kpis=[{label:'Projects',value:projectCount},{label:'Budget',value:`$${(usedBudget/1000).toFixed(0)}K/$${(totalBudget/1000).toFixed(0)}K`},{label:'Utilisation',value:`${util}%`,warn:util>85},{label:'Red',value:redCount,warn:redCount>0}];
  return(<div style={{display:'flex',gap:16}}>{kpis.map(k=>(<div key={k.label} style={{background:k.warn?'#fff0f0':'#f5f5f5',borderRadius:8,padding:'12px 20px'}}><div style={{fontSize:12,color:'#666'}}>{k.label}</div><div style={{fontSize:22,fontWeight:600,color:k.warn?'#c0392b':'#222'}}>{k.value}</div></div>))}</div>);
}
