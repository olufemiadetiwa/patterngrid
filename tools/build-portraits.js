#!/usr/bin/env node
/* Builds approved portraits from design-source/people/*.jpg into
   public/assets/img/people/<name>-{d,m}.webp (4:5, 1200 and 720 wide) plus
   an inline preview, written to public/assets/js/local-images.js alongside
   the hero frames under PG.localPeople. Usage: node tools/build-portraits.js */
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const src = path.join(__dirname, '..', 'design-source', 'people');
const out = path.join(__dirname, '..', 'public', 'assets', 'img', 'people');
fs.mkdirSync(out, { recursive: true });
const FOCAL = { 'founder-2025': [0.5, 0.36] };
const py = `
import json, sys, os, io, base64
from PIL import Image
src, out, focal = sys.argv[1], sys.argv[2], json.loads(sys.argv[3]); res = {}
def crop_at(im, fx, fy, tw, th):
    W,H=im.size; s=max(tw/W, th/H); sw,sh=round(W*s),round(H*s); big=im.resize((sw,sh), Image.LANCZOS)
    cx,cy=fx*sw, fy*sh; l=min(max(0,cx-tw/2), sw-tw); t=min(max(0,cy-th/2), sh-th)
    return big.crop((round(l),round(t),round(l)+tw,round(t)+th))
for f in sorted(os.listdir(src)):
    if not f.lower().endswith(('.jpg','.jpeg','.png')): continue
    name=os.path.splitext(f)[0]; im=Image.open(os.path.join(src,f)).convert('RGB'); fx,fy=focal.get(name,[0.5,0.4])
    d=crop_at(im, fx, fy, 1200, 1500); d.save(os.path.join(out,name+'-d.webp'),'WEBP',quality=84,method=6)
    m=d.resize((720,900), Image.LANCZOS); m.save(os.path.join(out,name+'-m.webp'),'WEBP',quality=82,method=6)
    l=d.resize((24,30)); b=io.BytesIO(); l.save(b,'WEBP',quality=35)
    res[name]={'d':'/assets/img/people/'+name+'-d.webp','m':'/assets/img/people/'+name+'-m.webp','w':1200,'h':1500,'lqip':'data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode(),
      'bytes':{'d':os.path.getsize(os.path.join(out,name+'-d.webp')),'m':os.path.getsize(os.path.join(out,name+'-m.webp'))}}
    print(name, res[name]['bytes'], file=sys.stderr)
print(json.dumps(res))
`;
const result = JSON.parse(execFileSync('python3', ['-c', py, src, out, JSON.stringify(FOCAL)], { stdio: ['ignore', 'pipe', 'inherit'] }).toString());
const li = path.join(__dirname, '..', 'public', 'assets', 'js', 'local-images.js');
let js = fs.readFileSync(li, 'utf8').replace(/\nwindow\.PG\.localPeople = [^\n]*\n?/, '\n');
js = js.trimEnd() + '\nwindow.PG.localPeople = ' + JSON.stringify(result) + ';\n';
fs.writeFileSync(li, js);
console.log('portraits:', Object.keys(result).join(', '));
