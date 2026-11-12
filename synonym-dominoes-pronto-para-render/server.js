// Servidor simples: serve a página e retransmite o estado do jogo por WebSocket.
const http=require("http"),fs=require("fs"),path=require("path"),{WebSocketServer}=require("ws");
const F=path.join(__dirname,"data.json");let docs={};
try{docs=JSON.parse(fs.readFileSync(F,"utf8"))}catch(e){}
let tm;const save=()=>{clearTimeout(tm);tm=setTimeout(()=>fs.writeFile(F,JSON.stringify(docs),()=>{}),500)};
const srv=http.createServer((q,r)=>fs.readFile(path.join(__dirname,"public","index.html"),(e,b)=>{
  r.writeHead(e?500:200,{"Content-Type":"text/html; charset=utf-8"});r.end(b)}));
const wss=new WebSocketServer({server:srv,maxPayload:200*1024});
wss.on("connection",ws=>{
  ws.send(JSON.stringify({t:"all",docs}));
  ws.on("message",raw=>{let m;try{m=JSON.parse(raw)}catch(e){return}
    if(m.t=="ping"||typeof m.p!="string"||m.p.length>100)return;
    if(m.t=="set")docs[m.p]=m.d;else if(m.t=="del")delete docs[m.p];else return;
    save();const out=raw.toString();
    wss.clients.forEach(c=>{if(c!==ws&&c.readyState==1)c.send(out)})})});
srv.listen(process.env.PORT||3000,()=>console.log("Jogo rodando na porta "+(process.env.PORT||3000)));
