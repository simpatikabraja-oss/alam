(() => {
  'use strict';

  const PLANETS = [
    {id:'mercury',name:'Merkurius',nameEn:'Mercury',color:'#9c9287',diameterKm:4879,distanceAU:.39,rotationHours:1407.6,orbitalDays:88,velocity:47.4,moons:0,type:'Planet Kebumian',temp:'167 °C (rata-rata)',atmosphere:'Eksosfer sangat tipis',composition:'Inti besi, mantel & kerak silikat',discoverer:'Dikenal sejak zaman kuno',tilt:.03,facts:['Hari matahari di Merkurius sekitar 176 hari Bumi.','Planet terdekat Matahari.','Permukaannya dipenuhi kawah.']},
    {id:'venus',name:'Venus',nameEn:'Venus',color:'#d9b892',diameterKm:12104,distanceAU:.72,rotationHours:-5832.5,orbitalDays:224.7,velocity:35,moons:0,type:'Planet Kebumian',temp:'464 °C',atmosphere:'Didominasi CO₂',composition:'Inti besi, mantel & kerak silikat',discoverer:'Dikenal sejak zaman kuno',tilt:177.4,facts:['Planet terpanas Tata Surya.','Berotasi retrograde.','Memiliki atmosfer sangat tebal.']},
    {id:'earth',name:'Bumi',nameEn:'Earth',color:'#2b6cff',diameterKm:12742,distanceAU:1,rotationHours:23.93,orbitalDays:365.25,velocity:29.8,moons:1,type:'Planet Kebumian',temp:'15 °C',atmosphere:'78% N₂, 21% O₂',composition:'Inti besi-nikel, mantel silikat, kerak & samudra',discoverer:'—',tilt:23.44,facts:['71% permukaan tertutup air.','Memiliki medan magnet pelindung.','Satu-satunya planet yang diketahui memiliki kehidupan.']},
    {id:'mars',name:'Mars',nameEn:'Mars',color:'#c1440e',diameterKm:6779,distanceAU:1.52,rotationHours:24.62,orbitalDays:687,velocity:24.1,moons:2,type:'Planet Kebumian',temp:'-65 °C',atmosphere:'Didominasi CO₂, sangat tipis',composition:'Batuan silikat dan besi oksida',discoverer:'Dikenal sejak zaman kuno',tilt:25.19,facts:['Dijuluki Planet Merah.','Memiliki Olympus Mons.','Memiliki Phobos dan Deimos.']},
    {id:'jupiter',name:'Jupiter',nameEn:'Jupiter',color:'#d8a47a',diameterKm:139820,distanceAU:5.2,rotationHours:9.93,orbitalDays:4331,velocity:13.1,moons:95,type:'Raksasa Gas',temp:'-110 °C',atmosphere:'Hidrogen & helium',composition:'Selubung hidrogen di atas inti padat',discoverer:'Dikenal sejak zaman kuno',tilt:3.13,facts:['Planet terbesar di Tata Surya.','Memiliki Bintik Merah Besar.','Memiliki cincin tipis.']},
    {id:'saturn',name:'Saturnus',nameEn:'Saturn',color:'#ead6a8',diameterKm:116460,distanceAU:9.58,rotationHours:10.7,orbitalDays:10747,velocity:9.7,moons:146,type:'Raksasa Gas',temp:'-140 °C',atmosphere:'Hidrogen & helium',composition:'Inti batuan-es dan selubung hidrogen',discoverer:'Dikenal sejak zaman kuno',tilt:26.73,ring:true,facts:['Memiliki sistem cincin paling mencolok.','Massa jenis rata-rata lebih rendah dari air.','Titan adalah bulan terbesarnya.']},
    {id:'uranus',name:'Uranus',nameEn:'Uranus',color:'#9fe3e8',diameterKm:50724,distanceAU:19.2,rotationHours:-17.24,orbitalDays:30589,velocity:6.8,moons:28,type:'Raksasa Es',temp:'-195 °C',atmosphere:'Hidrogen, helium, metana',composition:'Mantel kaya air, amonia & metana',discoverer:'William Herschel (1781)',tilt:97.77,ring:true,facts:['Sumbu rotasinya miring hampir 98°.','Ditemukan dengan teleskop.','Memiliki cincin tipis.']},
    {id:'neptune',name:'Neptunus',nameEn:'Neptune',color:'#3f5efb',diameterKm:49244,distanceAU:30.05,rotationHours:16.11,orbitalDays:59800,velocity:5.4,moons:16,type:'Raksasa Es',temp:'-200 °C',atmosphere:'Hidrogen, helium, metana',composition:'Mantel es dan inti batuan',discoverer:'Johann Galle (1846)',tilt:28.32,facts:['Planet terluar Tata Surya.','Memiliki angin sangat kencang.','Triton mengorbit secara retrograde.']}
  ];
  const SUN = {id:'sun',name:'Matahari',color:'#ffbd4a',diameterKm:1392000,temperature:'~5.505 °C (permukaan)',type:'Bintang deret utama tipe-G',facts:['Cahaya Matahari membutuhkan sekitar 8 menit 20 detik ke Bumi.','Matahari menyumbang sekitar 99,8% massa Tata Surya.','Suhu inti mencapai sekitar 15 juta °C.']};
  const SPEEDS = [.25,.5,1,2,5,10,50,100,500,1000,10000];
  const MOON_SEEDS = [
    ['earth','Bulan',3],['mars','Phobos',1.4],['mars','Deimos',2],['jupiter','Io',2.2],['jupiter','Europa',2.7],['jupiter','Ganymede',3.4],['jupiter','Callisto',4.2],['saturn','Titan',3.5],['saturn','Rhea',2.6],['saturn','Enceladus',2.1],['uranus','Titania',2.6],['uranus','Oberon',3.3],['neptune','Triton',2.6]
  ];

  const canvas = document.getElementById('scene-canvas');
  const ctx = canvas.getContext('2d', {alpha:false});
  if (!ctx) return bootError('Browser ini tidak menyediakan Canvas 2D.');
  const $ = id => document.getElementById(id);
  const els = {
    loading:$('loading-screen'), loadingBar:$('loading-bar'), loadingText:$('loading-text'),
    hudDate:$('hud-date'),hudTime:$('hud-time'),hudSelected:$('hud-selected'),hudCamdist:$('hud-camdist'),hudFps:$('hud-fps'),hudSpeed:$('hud-speed'),orbitToggle:$('orbit-toggle'),followToggle:$('follow-toggle'),focusHint:$('focus-hint'),focusHintTitle:$('focus-hint-title'),focusHintText:$('focus-hint-text'),focusHintClose:$('focus-hint-close'),interactionTip:$('interaction-tip'),timeSlider:$('time-slider'),simDateLabel:$('sim-date-label'),
    compass:$('compass-canvas'),minimap:$('minimap-canvas'),tooltip:$('tooltip'),egg:$('egg-banner'),search:$('search-input'),
    timeline:$('speed-buttons'),play:$('play-pause-btn'),audio:$('audio-toggle'),fullscreen:$('fullscreen-toggle'),info:$('info-panel'),infoContent:$('info-content')
  };
  const state = {
    width:0,height:0,dpr:1,yaw:-0.9,pitch:0.72,distance:245,targetX:0,targetY:0,targetZ:0,
    minDistance:95,maxDistance:520,dragging:false,lastX:0,lastY:0,pointerDownX:0,pointerDownY:0,
    selected:null,hover:null,speed:1,paused:false,audio:false,sound:null,orbits:true,labels:true,moons:true,asteroids:true,autoRotate:false,quality:'high',planetDetail:true,showOrbitLabels:true,followSelected:true,scaleMode:'visual',infoTab:'info',mission:{active:false,from:'earth',to:'mars',progress:0},
    simDays:0,fps:60,fpsFrames:0,fpsAccum:0,last:performance.now(),firstFrame:false,eggClicks:0,keyBuffer:[],themeBoost:0
  };
  const starField=[]; const asteroidField=[]; const planetRuntime=new Map(); const planetImages=Object.create(null); const focusAnim={active:false,start:0,duration:0,from:{},to:{}};

  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const lerp=(a,b,t)=>a+(b-a)*t;
  const hexToRgb=hex=>{const n=parseInt(hex.replace('#',''),16);return{r:(n>>16)&255,g:(n>>8)&255,b:n&255}};
  const colorString=(hex,a=1)=>{const c=hexToRgb(hex);return`rgba(${c.r},${c.g},${c.b},${a})`};
  const seeded=seed=>{const x=Math.sin(seed*12.9898)*43758.5453;return x-Math.floor(x)};
  const orbitRadius=au=>state.scaleMode==='real'?12+10*Math.pow(au,0.86):18+24*Math.log2(1+au*1.8);
  const planetRadius=p=>2.7+5.3*Math.cbrt(p.diameterKm/12742);
  const orbitalAngle=p=>(state.simDays/p.orbitalDays)*Math.PI*2+p.phase;
  const worldPlanet=p=>{const r=orbitRadius(p.distanceAU),a=orbitalAngle(p),tilt=p.tilt*Math.PI/180;let x=r*Math.cos(a),z=r*Math.sin(a),y=Math.sin(a*.8+p.tilt)*r*.08;const cy=Math.cos(tilt),sy=Math.sin(tilt),yy=y*cy-z*sy,zz=y*sy+z*cy;return{x,y:yy,z:zz,r}};
  PLANETS.forEach((p,i)=>{p.phase=seeded(i+11)*Math.PI*2;planetRuntime.set(p.id,{pulse:seeded(i+21),moonPhase:seeded(i+41)*Math.PI*2})});

  function buildStars(){starField.length=0;const count=state.quality==='low'?500:state.quality==='medium'?850:1300;for(let i=0;i<count;i++){const r=250+seeded(i*7+1)*650,a=seeded(i*3+2)*Math.PI*2,y=(seeded(i*11+3)*2-1)*260;starField.push({x:Math.cos(a)*r,y,z:Math.sin(a)*r,tw:seeded(i+90)*Math.PI*2,size:.35+seeded(i+170)*1.7,alpha:.35+seeded(i+210)*.6})}}
  function buildAsteroids(){asteroidField.length=0;const count=state.quality==='low'?120:state.quality==='medium'?220:360;for(let i=0;i<count;i++){const a=seeded(i+500)*Math.PI*2,r=orbitRadius(3+seeded(i+600)*1.7),wobble=(seeded(i+700)-.5)*2.2;asteroidField.push({a,r,wobble,size:.45+seeded(i+800)*.9,speed:.0002+seeded(i+900)*.0007})}}
  function resize(){state.dpr=Math.min(window.devicePixelRatio||1,2);state.width=innerWidth;state.height=innerHeight;canvas.width=Math.floor(state.width*state.dpr);canvas.height=Math.floor(state.height*state.dpr);ctx.setTransform(state.dpr,0,0,state.dpr,0,0)}
  addEventListener('resize',resize);resize();buildStars();buildAsteroids();

  function cameraBasis(){const cp=Math.cos(state.pitch),sp=Math.sin(state.pitch),cy=Math.cos(state.yaw),sy=Math.sin(state.yaw);return{dir:{x:cp*sy,y:sp,z:cp*cy},right:{x:cy,y:0,z:-sy},up:{x:-sp*sy,y:cp,z:-sp*cy}}}
  function cameraPosition(){const b=cameraBasis();return{x:state.targetX-b.dir.x*state.distance,y:state.targetY-b.dir.y*state.distance,z:state.targetZ-b.dir.z*state.distance}}
  function project(pos){const cam=cameraPosition(),b=cameraBasis(),vx=pos.x-cam.x,vy=pos.y-cam.y,vz=pos.z-cam.z,x=vx*b.right.x+vy*b.right.y+vz*b.right.z,y=vx*b.up.x+vy*b.up.y+vz*b.up.z,z=vx*b.dir.x+vy*b.dir.y+vz*b.dir.z;if(z<=1)return null;const focal=Math.min(state.width,state.height)*.86;return{x:state.width/2+(x/z)*focal,y:state.height/2-(y/z)*focal,z,scale:focal/z}}
  function gradientCircle(x,y,r,hex){
    const c=hexToRgb(hex);
    const g=ctx.createRadialGradient(x-r*.38,y-r*.42,r*.04,x+r*.24,y+r*.26,r*1.18);
    g.addColorStop(0,`rgba(${Math.min(255,c.r+92)},${Math.min(255,c.g+92)},${Math.min(255,c.b+92)},1)`);
    g.addColorStop(.42,colorString(hex,1));
    g.addColorStop(.8,colorString(hex,.96));
    g.addColorStop(1,'rgba(0,0,0,.94)');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
  }

  function loadPlanetImages(){
    const ids=['sun',...PLANETS.map(p=>p.id)];
    ids.forEach(id=>{const img=new Image();img.decoding='async';img.src=`assets/planets/${id}.png`;planetImages[id]=img;});
  }
  function drawImageSphere(id,x,y,r,spin=0){
    const img=planetImages[id];
    if(!img || !img.complete || !img.naturalWidth) return false;
    ctx.save();ctx.translate(x,y);ctx.rotate(spin);ctx.drawImage(img,-r,-r,r*2,r*2);ctx.restore();
    return true;
  }

  function drawBackground(t){
    const g=ctx.createRadialGradient(state.width*.48,state.height*.43,0,state.width*.48,state.height*.43,Math.max(state.width,state.height)*.75);
    g.addColorStop(0,'#101d45');g.addColorStop(.24,'#07112a');g.addColorStop(.6,'#040817');g.addColorStop(1,'#010208');
    ctx.fillStyle=g;ctx.fillRect(0,0,state.width,state.height);
    // Subtle space haze.
    const haze=ctx.createRadialGradient(state.width*.76,state.height*.27,0,state.width*.76,state.height*.27,Math.min(state.width,state.height)*.42);
    haze.addColorStop(0,'rgba(95,132,255,.08)');haze.addColorStop(1,'rgba(95,132,255,0)');ctx.fillStyle=haze;ctx.fillRect(0,0,state.width,state.height);
    for(const s of starField){const p=project(s);if(!p)continue;const tw=.72+.28*Math.sin(t*.0009+s.tw),sz=Math.max(.26,s.size*p.scale*.62);ctx.fillStyle=`rgba(225,238,255,${clamp(s.alpha*tw,0,.95)})`;ctx.beginPath();ctx.arc(p.x,p.y,sz,0,Math.PI*2);ctx.fill();}
  }

  function drawOrbit(planet){
    if(!state.orbits)return;
    const steps=180,segments=[],r=orbitRadius(planet.distanceAU),tilt=planet.tilt*Math.PI/180;
    let current=[];
    for(let i=0;i<=steps;i++){
      const a=i/steps*Math.PI*2;let x=r*Math.cos(a),z=r*Math.sin(a),y=Math.sin(a*.8+planet.tilt)*r*.08;
      const cy=Math.cos(tilt),sy=Math.sin(tilt),yy=y*cy-z*sy,zz=y*sy+z*cy,q=project({x,y:yy,z:zz});
      if(q){current.push(q)}else if(current.length>1){segments.push(current);current=[];}else{current=[];}
    }
    if(current.length>1)segments.push(current);
    if(!segments.length)return;
    ctx.save();ctx.lineCap='round';
    for(const seg of segments){
      // soft glow
      ctx.beginPath();ctx.setLineDash([5,7]);ctx.lineWidth=3;ctx.strokeStyle='rgba(94,167,255,.09)';ctx.moveTo(seg[0].x,seg[0].y);for(let i=1;i<seg.length;i++)ctx.lineTo(seg[i].x,seg[i].y);ctx.stroke();
      // crisp track
      ctx.beginPath();ctx.setLineDash([3,6]);ctx.lineWidth=1.45;ctx.strokeStyle='rgba(132,188,255,.38)';ctx.moveTo(seg[0].x,seg[0].y);for(let i=1;i<seg.length;i++)ctx.lineTo(seg[i].x,seg[i].y);ctx.stroke();
    }
    ctx.setLineDash([]);
    if(state.showOrbitLabels){
      const marker=project({x:-r,y:0,z:0});
      if(marker&&marker.x>16&&marker.x<state.width-16){
        ctx.font='600 9px Segoe UI,Arial';ctx.textAlign='right';ctx.fillStyle='rgba(145,188,238,.52)';ctx.fillText(`${planet.name} · ${planet.distanceAU} AU`,marker.x-7,marker.y-5);
      }
    }
    ctx.restore();
  }

  function drawAsteroids(t){if(!state.asteroids)return;for(const a of asteroidField){a.a+=a.speed*state.speed*(t*.018);const x=Math.cos(a.a)*a.r,z=Math.sin(a.a)*a.r,y=a.wobble*Math.sin(a.a*2),q=project({x,y,z});if(!q)continue;const s=Math.max(.35,a.size*q.scale*1.25);ctx.fillStyle='rgba(170,155,145,.56)';ctx.beginPath();ctx.arc(q.x,q.y,s,0,Math.PI*2);ctx.fill()}}
  function drawRing(q,rx,ry,angle){
    ctx.save();ctx.translate(q.x,q.y);ctx.rotate(angle);ctx.scale(1,ry/rx);
    ctx.lineCap='round';
    for(let i=0;i<5;i++){
      ctx.strokeStyle=i%2?'rgba(205,183,139,.44)':'rgba(248,226,175,.72)';
      ctx.lineWidth=Math.max(.6,q.scale*(i===0?2.2:1.1));
      ctx.beginPath();ctx.ellipse(0,0,rx*(1-i*.08),rx*(.29-i*.025),0,0,Math.PI*2);ctx.stroke();
    }
    ctx.strokeStyle='rgba(255,244,210,.42)';ctx.lineWidth=Math.max(.6,q.scale*.65);ctx.beginPath();ctx.ellipse(0,0,rx*.83,rx*.24,0,0,Math.PI*2);ctx.stroke();
    ctx.restore();
  }

  function drawMoons(p,q,r){const list=MOON_SEEDS.filter(m=>m[0]===p.id);if(!list.length)return;const runtime=planetRuntime.get(p.id);for(let i=0;i<list.length;i++){const seed=list[i][2],a=state.simDays/Math.max(.2,seed)*2.1+runtime.moonPhase+i,dist=r*(1.9+i*.62),x=q.x+Math.cos(a)*dist,y=q.y+Math.sin(a)*dist*.42,s=Math.max(1.1,r*.18);ctx.fillStyle=i===0?'#ded5c4':'#c7c9cc';ctx.beginPath();ctx.arc(x,y,s,0,Math.PI*2);ctx.fill()}}
  function blob(cx,cy,rad,pts,seed){
    const a=[];for(let i=0;i<pts;i++){const ang=i/pts*Math.PI*2;const wob=.72+.48*seeded(seed+i*1.7);a.push([cx+Math.cos(ang)*rad*wob,cy+Math.sin(ang)*rad*wob]);}return a;
  }
  function drawSurfaceTexture(p,x,y,r){
    ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.clip();
    const id=p.id;
    // Directional light and subtle spherical shading.
    const shade=ctx.createRadialGradient(x-r*.5,y-r*.52,r*.04,x+r*.34,y+r*.38,r*1.18);
    const c=hexToRgb(p.color);shade.addColorStop(0,`rgba(${Math.min(255,c.r+90)},${Math.min(255,c.g+90)},${Math.min(255,c.b+90)},.72)`);shade.addColorStop(.55,'rgba(255,255,255,.06)');shade.addColorStop(1,'rgba(0,0,0,.65)');ctx.fillStyle=shade;ctx.fillRect(x-r,y-r,r*2,r*2);

    if(id==='earth'){
      // Oceans
      ctx.fillStyle='rgba(24,88,182,.56)';ctx.fillRect(x-r,y-r,r*2,r*2);
      // Continents (deterministic, hand-shaped blobs)
      const land=[[-.32,-.18,.38,31,11],[-.02,.20,.46,28,19],[.40,.02,.30,24,29],[-.42,.42,.20,22,37],[.28,.42,.18,20,44]];
      for(const [dx,dy,rr,pts,seed] of land){const pts2=blob(x+dx*r,y+dy*r,rr*r,pts,seed);ctx.beginPath();ctx.moveTo(pts2[0][0],pts2[0][1]);for(const pt of pts2)ctx.lineTo(pt[0],pt[1]);ctx.closePath();ctx.fillStyle=seed%2?'rgba(66,142,76,.82)':'rgba(81,157,86,.72)';ctx.fill();}
      // Cloud ribbons
      for(let i=0;i<8;i++){const yy=y-r*.68+i*r*.19;ctx.strokeStyle=`rgba(255,255,255,${.14+(i%3)*.035})`;ctx.lineWidth=Math.max(1,r*.045);ctx.beginPath();ctx.arc(x-r*.1,yy,r*(.75+.08*Math.sin(i)),Math.PI*.08,Math.PI*.92);ctx.stroke();}
    } else if(id==='mars'){
      for(let i=0;i<14;i++){const dx=(seeded(i+4)-.5)*1.5*r,dy=(seeded(i+10)-.5)*1.5*r,cr=r*(.035+seeded(i+30)*.08);ctx.strokeStyle='rgba(70,25,12,.28)';ctx.lineWidth=Math.max(.7,cr*.28);ctx.beginPath();ctx.arc(x+dx,y+dy,cr,0,Math.PI*2);ctx.stroke();ctx.fillStyle='rgba(255,164,109,.09)';ctx.beginPath();ctx.arc(x+dx-cr*.2,y+dy-cr*.2,cr*.3,0,Math.PI*2);ctx.fill();}
      ctx.fillStyle='rgba(245,228,205,.75)';ctx.beginPath();ctx.ellipse(x-r*.24,y-r*.83,r*.20,r*.07,-.2,0,Math.PI*2);ctx.fill();
    } else if(id==='mercury'){
      for(let i=0;i<18;i++){const dx=(seeded(i+2)-.5)*1.65*r,dy=(seeded(i+19)-.5)*1.65*r,cr=r*(.025+seeded(i+33)*.09);ctx.fillStyle='rgba(70,62,56,.22)';ctx.beginPath();ctx.arc(x+dx,y+dy,cr,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(235,225,210,.16)';ctx.lineWidth=Math.max(.5,cr*.17);ctx.stroke();}
    } else if(id==='venus'){
      for(let i=0;i<9;i++){const yy=y-r*.8+i*r*.18;ctx.strokeStyle=`rgba(255,233,180,${.20+(i%3)*.045})`;ctx.lineWidth=Math.max(1,r*.11);ctx.beginPath();ctx.arc(x+r*.1,yy,r*(.78-.03*i),Math.PI*.12,Math.PI*.88);ctx.stroke();}
    } else if(id==='jupiter'){
      const bands=[['rgba(244,219,180,.72)',.17],['rgba(164,124,91,.60)',.14],['rgba(231,195,154,.68)',.13],['rgba(133,91,65,.52)',.10],['rgba(229,203,175,.70)',.16],['rgba(165,119,85,.52)',.10]];
      for(let i=0;i<bands.length;i++){const yy=y-r*.78+i*r*.28;ctx.strokeStyle=bands[i][0];ctx.lineWidth=Math.max(2,r*bands[i][1]);ctx.beginPath();ctx.moveTo(x-r,yy);ctx.bezierCurveTo(x-r*.35,yy-r*.03,x+r*.35,yy+r*.06,x+r,yy-r*.015);ctx.stroke();}
      ctx.fillStyle='rgba(205,95,66,.82)';ctx.beginPath();ctx.ellipse(x+r*.36,y+r*.12,r*.20,r*.105,-.10,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(120,58,45,.55)';ctx.lineWidth=Math.max(1,r*.035);ctx.stroke();
    } else if(id==='saturn'){
      for(let i=0;i<7;i++){const yy=y-r*.72+i*r*.23;ctx.strokeStyle=`rgba(255,242,199,${.18+(i%2)*.07})`;ctx.lineWidth=Math.max(1,r*.09);ctx.beginPath();ctx.moveTo(x-r,yy);ctx.lineTo(x+r,yy+r*.015);ctx.stroke();}
      ctx.fillStyle='rgba(195,159,111,.18)';ctx.beginPath();ctx.ellipse(x-r*.2,y+r*.1,r*.33,r*.16,.2,0,Math.PI*2);ctx.fill();
    } else if(id==='uranus'){
      for(let i=0;i<7;i++){const yy=y-r*.62+i*r*.20;ctx.strokeStyle=`rgba(224,255,255,${.18+(i%2)*.05})`;ctx.lineWidth=Math.max(.8,r*.07);ctx.beginPath();ctx.moveTo(x-r,yy);ctx.lineTo(x+r,yy-r*.015);ctx.stroke();}
    } else if(id==='neptune'){
      for(let i=0;i<8;i++){const yy=y-r*.66+i*r*.18;ctx.strokeStyle=`rgba(138,168,255,${.18+(i%3)*.05})`;ctx.lineWidth=Math.max(.8,r*.07);ctx.beginPath();ctx.moveTo(x-r,yy);ctx.bezierCurveTo(x-r*.2,yy+r*.04,x+r*.2,yy-r*.03,x+r,yy);ctx.stroke();}
      ctx.fillStyle='rgba(44,61,150,.50)';ctx.beginPath();ctx.ellipse(x+r*.22,y-r*.10,r*.18,r*.07,-.15,0,Math.PI*2);ctx.fill();
    }
    ctx.restore();
  }

  function drawPlanet(p){
    const w=worldPlanet(p),q=project(w);if(!q)return null;
    const r=Math.max(3.2,planetRadius(p)*q.scale*(p.id==='sun'?1:1.02));
    // atmosphere rim inspired by the V3 mockup
    const glow=ctx.createRadialGradient(q.x,q.y,r*.62,q.x,q.y,r*1.50);glow.addColorStop(0,'rgba(0,0,0,0)');glow.addColorStop(.72,idAtmosphere(p.id,.19));glow.addColorStop(1,idAtmosphere(p.id,0));ctx.fillStyle=glow;ctx.beginPath();ctx.arc(q.x,q.y,r*1.5,0,Math.PI*2);ctx.fill();
    // Saturn/Uranus rings behind the sphere.
    if(p.ring) drawRing(q,r*2.38,r*.90,state.yaw*.35+(p.id==='uranus'?1.55:.1));
    const drew=drawImageSphere(p.id,q.x,q.y,r,state.simDays*(p.id==='mercury'?-.006:p.id==='venus'?-0.0017:p.id==='earth'?0.022:p.id==='mars'?0.020:p.id==='jupiter'?0.028:p.id==='saturn'?0.024:p.id==='uranus'?-0.009:0.018));
    if(!drew){ gradientCircle(q.x,q.y,r,p.color); if(state.planetDetail) drawSurfaceTexture(p,q.x,q.y,r); }
    // subtle night-side terminator for depth
    ctx.save();ctx.beginPath();ctx.arc(q.x,q.y,r,0,Math.PI*2);ctx.clip();const night=ctx.createLinearGradient(q.x-r,q.y-r*.12,q.x+r,q.y+r*.1);night.addColorStop(0,'rgba(0,0,0,.40)');night.addColorStop(.44,'rgba(0,0,0,.10)');night.addColorStop(.72,'rgba(0,0,0,0)');ctx.fillStyle=night;ctx.fillRect(q.x-r,q.y-r,r*2,r*2);ctx.restore();
    // highlight rim
    ctx.beginPath();ctx.arc(q.x-r*.04,q.y-r*.04,r*.97,-2.95,-1.1);ctx.strokeStyle='rgba(255,255,255,.11)';ctx.lineWidth=Math.max(0.6,r*.028);ctx.stroke();
    if(state.selected===p.id){ctx.beginPath();ctx.arc(q.x,q.y,r+7,0,Math.PI*2);ctx.strokeStyle='rgba(103,210,255,.90)';ctx.lineWidth=2.2;ctx.stroke();}
    if(state.themeBoost>0){ctx.beginPath();ctx.arc(q.x,q.y,r+10,0,Math.PI*2);ctx.strokeStyle=`rgba(255,191,88,${state.themeBoost*.42})`;ctx.lineWidth=4;ctx.stroke();}
    if(state.moons)drawMoons(p,q,r);
    if(state.labels&&r>5){ctx.font='700 11px Segoe UI,Arial';ctx.textAlign='center';ctx.fillStyle='rgba(235,243,255,.96)';ctx.shadowColor='rgba(0,0,0,.84)';ctx.shadowBlur=4;ctx.fillText(p.name,q.x,q.y+r+15);ctx.shadowBlur=0;}
    return{...q,r};
  }
  function idAtmosphere(id,a){const colors={earth:`rgba(92,186,255,${a})`,venus:`rgba(255,207,142,${a})`,mars:`rgba(240,131,96,${a})`,jupiter:`rgba(240,203,165,${a})`,saturn:`rgba(242,218,166,${a})`,uranus:`rgba(140,246,255,${a})`,neptune:`rgba(92,138,255,${a})`,mercury:`rgba(214,220,226,${a})`};return colors[id]||`rgba(180,210,255,${a})`; }

  function drawSun(){
    const q=project({x:0,y:0,z:0});if(!q)return null;
    const r=Math.max(13,25*q.scale);
    const glow=ctx.createRadialGradient(q.x,q.y,r*.15,q.x,q.y,r*3.8);glow.addColorStop(0,'rgba(255,243,182,.65)');glow.addColorStop(.20,'rgba(255,190,55,.30)');glow.addColorStop(.55,'rgba(255,126,24,.11)');glow.addColorStop(1,'rgba(255,80,0,0)');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(q.x,q.y,r*3.8,0,Math.PI*2);ctx.fill();
    const g=ctx.createRadialGradient(q.x-r*.36,q.y-r*.42,r*.04,q.x+r*.25,q.y+r*.27,r*1.2);g.addColorStop(0,'#fffbe1');g.addColorStop(.25,'#ffe77d');g.addColorStop(.56,'#ffbd3e');g.addColorStop(1,'#ff6c1e');ctx.fillStyle=g;ctx.beginPath();ctx.arc(q.x,q.y,r,0,Math.PI*2);ctx.fill();
    ctx.save();ctx.beginPath();ctx.arc(q.x,q.y,r,0,Math.PI*2);ctx.clip();for(let i=0;i<18;i++){const a=seeded(i+41)*Math.PI*2,rr=r*(.15+seeded(i+71)*.72),x=q.x+Math.cos(a)*rr,y=q.y+Math.sin(a)*rr,cr=r*(.02+seeded(i+99)*.09);ctx.fillStyle=`rgba(168,66,10,${.10+seeded(i+111)*.16})`;ctx.beginPath();ctx.arc(x,y,cr,0,Math.PI*2);ctx.fill();}ctx.restore();
    if(state.selected==='sun'){ctx.strokeStyle='rgba(255,224,120,.95)';ctx.lineWidth=2.2;ctx.beginPath();ctx.arc(q.x,q.y,r+7,0,Math.PI*2);ctx.stroke()}
    if(state.labels&&r>8){ctx.font='700 11px Segoe UI,Arial';ctx.textAlign='center';ctx.fillStyle='rgba(255,235,170,.95)';ctx.shadowColor='rgba(0,0,0,.8)';ctx.shadowBlur=4;ctx.fillText('Matahari',q.x,q.y+r+15);ctx.shadowBlur=0;}
    return{...q,r};
  }

  function drawMissionOverlay(t){if(!state.mission.active)return;const from=focusWorldPosition(state.mission.from),to=focusWorldPosition(state.mission.to),a=project(from),b=project(to);if(!a||!b)return;state.mission.progress+=0.00012*state.speed;if(state.mission.progress>1)state.mission.progress=0;const x0=a.x,y0=a.y,x1=b.x,y1=b.y,ctrlX=(x0+x1)/2,ctrlY=Math.min(y0,y1)-80,u=state.mission.progress,px=(1-u)*(1-u)*x0+2*(1-u)*u*ctrlX+u*u*x1,py=(1-u)*(1-u)*y0+2*(1-u)*u*ctrlY+u*u*y1;ctx.save();ctx.strokeStyle='rgba(122,200,255,.55)';ctx.lineWidth=1.5;ctx.setLineDash([7,7]);ctx.beginPath();ctx.moveTo(x0,y0);ctx.quadraticCurveTo(ctrlX,ctrlY,x1,y1);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='rgba(255,255,255,.96)';ctx.shadowColor='rgba(108,214,255,.9)';ctx.shadowBlur=18;ctx.beginPath();ctx.arc(px,py,3.5,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='rgba(215,235,255,.8)';ctx.font='600 10px Segoe UI,Arial';ctx.textAlign='center';ctx.fillText('🚀',px,py-10);ctx.restore();}
  function render(t){
    drawBackground(t);
    PLANETS.forEach(drawOrbit);
    drawAsteroids(t);
    const items=[];const sun=drawSun();if(sun)items.push({id:'sun',q:sun,z:sun.z});
    const rendered=PLANETS.map(p=>({p,q:worldPlanet(p)})).map(({p})=>{const q=drawPlanet(p);return q?{id:p.id,q,z:q.z}:null}).filter(Boolean);
    items.push(...rendered);
    drawMissionOverlay(t);
    if(state.hover){const h=items.find(x=>x.id===state.hover);if(h){ctx.beginPath();ctx.arc(h.q.x,h.q.y,h.q.r+5,0,Math.PI*2);ctx.strokeStyle='rgba(150,220,255,.55)';ctx.lineWidth=1.6;ctx.stroke();}}
    state.themeBoost=Math.max(0,state.themeBoost-.018);
  }

  function updateHud(){const d=new Date(Date.UTC(2025,0,1));d.setUTCDate(d.getUTCDate()+Math.floor(state.simDays));d.setUTCSeconds(Math.floor((state.simDays%1)*86400));const dateText=new Intl.DateTimeFormat('id-ID',{day:'2-digit',month:'short',year:'numeric'}).format(d);els.hudDate.textContent=dateText;els.hudTime.textContent=new Intl.DateTimeFormat('id-ID',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false,timeZone:'UTC'}).format(d)+' UTC';els.simDateLabel&&(els.simDateLabel.textContent=dateText);if(els.timeSlider&&document.activeElement!==els.timeSlider)els.timeSlider.value=Math.round(state.simDays);els.hudSelected.textContent=state.selected==='sun'?'Matahari':(PLANETS.find(p=>p.id===state.selected)?.name||'Tidak ada');els.hudCamdist.textContent=Math.round(state.distance)+' unit';els.hudFps.textContent=Math.round(state.fps)+' FPS';els.hudSpeed.textContent='x'+state.speed+(state.paused?' · pause':'')}
  function drawCompass(){const c=els.compass.getContext('2d');if(!c)return;c.clearRect(0,0,80,80);c.save();c.translate(40,40);c.strokeStyle='rgba(103,210,255,.45)';c.lineWidth=1;c.beginPath();c.arc(0,0,26,0,Math.PI*2);c.stroke();const a=state.yaw;c.rotate(-a);c.fillStyle='rgba(103,210,255,.9)';c.beginPath();c.moveTo(0,-20);c.lineTo(5,5);c.lineTo(0,2);c.lineTo(-5,5);c.closePath();c.fill();c.fillStyle='#8fa6cf';c.font='9px Segoe UI';c.textAlign='center';c.fillText('N',0,-28);c.restore()}
  function drawMinimap(){const c=els.minimap.getContext('2d');if(!c)return;c.clearRect(0,0,150,150);c.fillStyle='rgba(7,12,24,.55)';c.fillRect(0,0,150,150);c.fillStyle='#ffd15a';c.beginPath();c.arc(75,75,3,0,Math.PI*2);c.fill();PLANETS.forEach(p=>{const a=orbitalAngle(p),r=14+Math.log2(1+p.distanceAU)*17,x=75+Math.cos(a)*r,y=75+Math.sin(a)*r*.55;c.fillStyle=p.color;c.beginPath();c.arc(x,y,p.id===state.selected?4:2.5,0,Math.PI*2);c.fill()})}
  function focusWorldPosition(id){if(id==='sun')return{x:0,y:0,z:0};const p=PLANETS.find(x=>x.id===id);return p?worldPlanet(p):{x:0,y:0,z:0}}
  function targetDistanceFor(id){if(id==='sun')return clamp(Math.min(state.width,state.height)*.7,155,230);const p=PLANETS.find(x=>x.id===id);if(!p)return 145;const r=planetRadius(p),focal=Math.min(state.width,state.height)*.86,desired=Math.max(82,Math.min(135,Math.min(state.width,state.height)*.14));return clamp((focal*r)/desired,82,205)}
  function focusHint(id){const name=id==='sun'?'Matahari':(PLANETS.find(p=>p.id===id)?.name||'Objek');if(els.focusHint){els.focusHintTitle.textContent=`${name} dipilih`;els.focusHintText.textContent='Kamera mengunci posisi. Klik area kosong untuk menutup deskripsi.';els.focusHint.classList.add('show');clearTimeout(focusHint.timer);focusHint.timer=setTimeout(()=>els.focusHint?.classList.remove('show'),3400)}}
  function updateFollowTarget(){if(!state.followSelected||!state.selected||focusAnim.active)return;const q=focusWorldPosition(state.selected);state.targetX=q.x;state.targetY=q.y;state.targetZ=q.z}
  function updateFocus(now){if(!focusAnim.active)return;const t=clamp((now-focusAnim.start)/focusAnim.duration,0,1),e=t*t*(3-2*t);Object.keys(focusAnim.to).forEach(k=>state[k]=lerp(focusAnim.from[k],focusAnim.to[k],e));if(t>=1){focusAnim.active=false;state.followSelected=true;updateFollowTarget();}}
  function focusOn(id){const target=focusWorldPosition(id),from={targetX:state.targetX,targetY:state.targetY,targetZ:state.targetZ,distance:state.distance};const targetDist=targetDistanceFor(id);focusAnim.active=true;focusAnim.start=performance.now();focusAnim.duration=650;focusAnim.from=from;focusAnim.to={targetX:target.x,targetY:target.y,targetZ:target.z,distance:targetDist};state.selected=id;state.followSelected=true;focusHint(id)}
  function pick(x,y){let best=null,bestDist=Infinity;const sun=project({x:0,y:0,z:0});if(sun){const d=Math.hypot(x-sun.x,y-sun.y),r=Math.max(14,22*sun.scale);if(d<r+8&&d<bestDist){best='sun';bestDist=d}}PLANETS.forEach(p=>{const q=project(worldPlanet(p));if(!q)return;const d=Math.hypot(x-q.x,y-q.y),r=Math.max(8,planetRadius(p)*q.scale+5);if(d<r&&d<bestDist){best=p.id;bestDist=d}});return best}

  function infoTabs(id,active){return `<div class="info-tabs"><button class="info-tab ${active==='info'?'active':''}" data-info-tab="info" data-info-id="${id}">Info</button><button class="info-tab ${active==='satellite'?'active':''}" data-info-tab="satellite" data-info-id="${id}">Satelit</button><button class="info-tab ${active==='atmosphere'?'active':''}" data-info-tab="atmosphere" data-info-id="${id}">Atmosfer</button><button class="info-tab ${active==='facts'?'active':''}" data-info-tab="facts" data-info-id="${id}">Fakta</button></div>`}
  function renderInfoTab(id,tab){
    const p=id==='sun'?SUN:PLANETS.find(x=>x.id===id); if(!p) return '';
    if(tab==='satellite'){
      if(id==='sun') return '<h4>Satelit utama</h4><p>Matahari adalah pusat sistem, bukan planet yang memiliki satelit alami.</p>';
      const moons=MOON_SEEDS.filter(m=>m[0]===id);
      if(!moons.length) return '<h4>Satelit utama</h4><p>Planet ini tidak memiliki satelit alami.</p>';
      const chips=moons.map(m=>`<div class="satellite-chip"><b>${m[1]}</b><span>orbit relatif ${m[2].toFixed(1)}×</span></div>`).join('');
      return `<h4>Satelit utama</h4><div class="satellite-grid">${chips}</div><p class="muted-note">Jumlah satelit yang diketahui: <b>${p.moons}</b>. Visual hanya menampilkan beberapa satelit utama.</p>`;
    }
    if(tab==='atmosphere'){
      if(id==='sun') return '<h4>Atmosfer bintang</h4><div class="atmo-card"><b>Fotosfer</b><span>Lapisan tampak Matahari tempat sebagian besar cahaya terlihat.</span></div><div class="atmo-card"><b>Korona</b><span>Lapisan luar yang sangat panas dan membentuk halo di sekitar Matahari.</span></div>';
      return `<h4>Atmosfer & struktur</h4><div class="info-grid"><div class="info-row"><span>Komposisi</span><b>${p.composition}</b></div><div class="info-row"><span>Atmosfer</span><b>${p.atmosphere}</b></div><div class="info-row"><span>Kemiringan sumbu</span><b>${p.tilt}°</b></div><div class="info-row"><span>Cincin</span><b>${p.ring?'Ya':'Tidak'}</b></div></div>`;
    }
    if(tab==='facts') return `<h4>Fakta menarik</h4><ul>${p.facts.map(x=>`<li>${x}</li>`).join('')}</ul>`;
    const lines=id==='sun'?[['Tipe',p.type],['Diameter',p.diameterKm.toLocaleString('id-ID')+' km'],['Suhu permukaan',p.temperature]]:[['Tipe',p.type],['Jarak',p.distanceAU+' AU'],['Diameter',p.diameterKm.toLocaleString('id-ID')+' km'],['Hari rotasi',p.rotationHours+' jam'],['Tahun',p.orbitalDays.toLocaleString('id-ID')+' hari'],['Kecepatan orbit',p.velocity+' km/s'],['Bulan',String(p.moons)],['Suhu rata-rata',p.temp]];
    return `<h4>Data inti</h4><div class="info-grid">${lines.map(([a,b])=>`<div class="info-row"><span>${a}</span><b>${b}</b></div>`).join('')}</div>`;
  }
  function openInfo(id,tab='info'){const p=id==='sun'?SUN:PLANETS.find(x=>x.id===id);if(!p)return;state.infoTab=tab;els.infoContent.innerHTML=`<div class="info-header"><div class="planet-thumb planet-art" style="background-image:url('assets/planets/${id}.png');background-size:cover;background-position:center" aria-hidden="true"></div><div><h2>${p.name}</h2><div class="info-sub">${p.nameEn||'Solaris object'} · ${state.followSelected?'Kamera mengikuti':'Mode bebas'}</div></div></div><div class="info-focus-note">🎯 <span>Klik area kosong pada ruang untuk menutup panel ini.</span></div>${infoTabs(id,tab)}<div class="info-tab-body">${renderInfoTab(id,tab)}</div><button id="focus-again-btn" class="btn-primary">🎯 Fokus lagi ke ${p.name}</button>`;els.info.classList.add('open')}
  function closeInfo(){els.info.classList.remove('open')}
  function closePanels(){document.querySelectorAll('.left-panel').forEach(x=>x.classList.remove('open'));closeInfo()}
  function resetView(){state.yaw=-.9;state.pitch=.72;state.distance=245;state.targetX=0;state.targetY=0;state.targetZ=0;state.selected=null;state.followSelected=false;focusAnim.active=false;closeInfo();els.followToggle?.classList.remove('active');if(els.followToggle)els.followToggle.textContent='FREE'}
  function togglePanel(name){closePanels();if(name==='home'){resetView();return}const map={planets:'planet-list-panel',mission:'mission-panel',education:'education-panel',gallery:'gallery-panel',about:'about-panel',braja:'braja-panel',settings:'settings-panel'};if(map[name])document.getElementById(map[name]).classList.add('open');if(name==='explore')showEgg('🛰️ Explore: seret untuk rotasi, scroll untuk zoom, klik planet untuk fokus.');if(name==='timeline')showEgg('⏱️ Timeline: pilih kecepatan simulasi di dock bawah.')}
  function showEgg(msg){els.egg.textContent=msg;els.egg.classList.add('egg-show');clearTimeout(showEgg.timer);showEgg.timer=setTimeout(()=>els.egg.classList.remove('egg-show'),3000)}

  function buildSettings(){
    const body=document.querySelector('.settings-body');
    body.innerHTML=`<div class="settings-row"><label>Orbit planet</label><input id="set-orbits" type="checkbox" ${state.orbits?'checked':''}></div><div class="settings-row"><label>Label orbit</label><input id="set-orbit-labels" type="checkbox" ${state.showOrbitLabels?'checked':''}></div><div class="settings-row"><label>Detail planet</label><input id="set-detail" type="checkbox" ${state.planetDetail?'checked':''}></div><div class="settings-row"><label>Nama planet</label><input id="set-labels" type="checkbox" ${state.labels?'checked':''}></div><div class="settings-row"><label>Bulan</label><input id="set-moons" type="checkbox" ${state.moons?'checked':''}></div><div class="settings-row"><label>Sabuk asteroid</label><input id="set-asteroids" type="checkbox" ${state.asteroids?'checked':''}></div><div class="settings-row"><label>Ikuti planet yang dipilih</label><input id="set-follow" type="checkbox" ${state.followSelected?'checked':''}></div><div class="settings-row"><label>Skala tampilan</label><select id="set-scale"><option value="visual" ${state.scaleMode==='visual'?'selected':''}>Visual Scale</option><option value="real" ${state.scaleMode==='real'?'selected':''}>Real-ish Scale</option></select></div><div class="settings-row"><label>Auto rotate</label><input id="set-autorotate" type="checkbox" ${state.autoRotate?'checked':''}></div><div class="settings-row"><label>Kualitas</label><select id="set-quality"><option value="low" ${state.quality==='low'?'selected':''}>Low</option><option value="medium" ${state.quality==='medium'?'selected':''}>Medium</option><option value="high" ${state.quality==='high'?'selected':''}>High</option></select></div><button class="btn-ghost" id="settings-reset">Kembalikan default</button>`;
    $('set-orbits').onchange=e=>{state.orbits=e.target.checked;showEgg(state.orbits?'◌ Orbit aktif':'Orbit disembunyikan')};
    $('set-orbit-labels').onchange=e=>state.showOrbitLabels=e.target.checked;
    $('set-detail').onchange=e=>state.planetDetail=e.target.checked;
    $('set-labels').onchange=e=>state.labels=e.target.checked;
    $('set-moons').onchange=e=>state.moons=e.target.checked;
    $('set-asteroids').onchange=e=>state.asteroids=e.target.checked;
    $('set-follow').onchange=e=>{state.followSelected=e.target.checked;if(state.followSelected&&state.selected)updateFollowTarget()};$('set-scale').onchange=e=>{state.scaleMode=e.target.value;if(state.selected)focusOn(state.selected)};$('set-autorotate').onchange=e=>state.autoRotate=e.target.checked;
    $('set-quality').onchange=e=>{state.quality=e.target.value;buildStars();buildAsteroids()};
    $('settings-reset').onclick=()=>{state.orbits=true;state.showOrbitLabels=true;state.planetDetail=true;state.labels=true;state.moons=true;state.asteroids=true;state.autoRotate=false;state.followSelected=true;state.scaleMode='visual';state.quality='high';buildSettings();buildStars();buildAsteroids();showEgg('⚙️ Pengaturan dikembalikan')}
  }
  function buildUI(){
    const list=document.querySelector('.planet-list-body'),gallery=document.querySelector('.gallery-body');
    PLANETS.forEach(p=>{const b=document.createElement('button');b.className='planet-list-item';b.innerHTML=`<span class="dot" style="background:${p.color};color:${p.color}"></span><span>${p.name}</span><small>${p.nameEn}</small>`;b.onclick=()=>{closePanels();focusOn(p.id);openInfo(p.id)};list.appendChild(b);const g=document.createElement('div');g.className='gallery-card';g.innerHTML=`<div class="swatch planet-art" style="background-image:url('assets/planets/${p.id}.png')"></div><div class="gcard-name">${p.name}</div>`;g.onclick=()=>{closePanels();focusOn(p.id);openInfo(p.id)};gallery.appendChild(g)});
    gallery.insertAdjacentHTML('afterbegin',`<div class="gallery-card" data-sun-card><div class="swatch planet-art" style="background-image:url('assets/planets/sun.png')"></div><div class="gcard-name">Matahari</div></div>`);document.querySelector('[data-sun-card]').onclick=()=>{closePanels();focusOn('sun');openInfo('sun')};
    document.querySelector('.about-body').innerHTML='<h2>Solaris V5</h2><p>Simulasi Tata Surya interaktif dengan tampilan 3D berbasis Canvas. Versi ini tidak memakai Three.js, CDN, import map, font eksternal, atau aset eksternal sehingga bisa dibuka langsung dari <b>index.html</b>.</p><h4>Kontrol</h4><ul><li>Drag untuk memutar kamera.</li><li>Scroll / wheel untuk zoom.</li><li>Klik planet untuk fokus dan info.</li><li>Space untuk pause/play.</li><li>R untuk reset kamera.</li><li>F untuk FOLLOW/FREE kamera.</li><li>Esc untuk menutup deskripsi.</li></ul><h4>Gabungan V1–V5</h4><p>Orbit, zoom, fokus planet, follow camera, detail planet, satelit, asteroid, timeline, misi, edukasi, galeri, profil Braja Simpatka, minimap, kompas, audio, fullscreen, dan mode skala.</p>';
    document.querySelector('.braja-body').innerHTML='<div class="owner-card"><div class="owner-avatar">BS</div><div><h2>Braja Simpatka</h2><div class="owner-role">Tentang Saya</div></div></div><div class="owner-section"><div class="owner-row"><span>Nama</span><b>Braja Simpatka</b></div><div class="owner-row"><span>Proyek</span><b>Solaris</b></div><div class="owner-row"><span>Halaman</span><b>Profil personal</b></div></div><h4>Catatan</h4><div class="owner-note">Area ini disiapkan khusus untuk profil Braja Simpatka. Bio, kelas/sekolah, kontak, media sosial, atau deskripsi lain dapat ditambahkan di fungsi <code>buildUI()</code> pada <code>js/main.js</code>.</div>';
    document.querySelector('.mission-body').innerHTML='<h2>Mission Mode</h2><p>Pilih rute untuk membuat lintasan transfer sederhana. Kapal akan bergerak di antara posisi planet dan kamera dapat mengikuti target.</p><div class="mission-card"><b>🌍 Bumi → Mars</b><span>Transfer orbit • simulasi edukasi</span><button class="btn-primary mission-launch" data-from="earth" data-to="mars">Mulai Misi</button></div><div class="mission-card"><b>🌍 Bumi → Saturnus</b><span>Perjalanan jauh • lihat skala orbit</span><button class="btn-primary mission-launch" data-from="earth" data-to="saturn">Mulai Misi</button></div><div class="mission-status" id="mission-status">Misi belum aktif.</div>';
    document.querySelector('.education-body').innerHTML='<h2>Belajar Tata Surya</h2><p>Gabungan fitur eksplorasi, timeline, atmosfer, satelit, skala, dan kuis mini.</p><div class="edu-card"><b>🌐 Visual Scale</b><span>Jarak orbit dikompresi agar semua planet nyaman dilihat.</span></div><div class="edu-card"><b>📐 Real-ish Scale</b><span>Orbit luar dibuat lebih renggang untuk memperlihatkan perbedaan jarak.</span></div><div class="edu-card"><b>🧠 Kuis cepat</b><span>Planet mana yang memiliki Bintik Merah Besar?</span><div class="quiz-options"><button data-answer="wrong">Mars</button><button data-answer="correct">Jupiter</button><button data-answer="wrong">Venus</button></div><div id="quiz-result"></div></div>';
    document.querySelectorAll('.mission-launch').forEach(btn=>btn.onclick=()=>{const from=btn.dataset.from,to=btn.dataset.to;state.mission={active:true,from,to,progress:0};focusOn(to);openInfo(to);const label=to==='mars'?'Mars':to==='saturn'?'Saturnus':'target';const status=document.getElementById('mission-status');if(status)status.textContent=`🚀 Misi aktif: ${from==='earth'?'Bumi':from} → ${label}`;showEgg(`🚀 Misi ${from==='earth'?'Bumi':from} → ${label} dimulai`);});
    document.querySelectorAll('.quiz-options button').forEach(btn=>btn.onclick=()=>{const out=document.getElementById('quiz-result');if(out)out.textContent=btn.dataset.answer==='correct'?'✅ Benar! Jupiter memiliki Bintik Merah Besar.':'❌ Belum tepat. Coba lagi.'});
    buildSettings();SPEEDS.forEach(s=>{const b=document.createElement('button');b.className='speed-btn'+(s===1?' active':'');b.textContent='x'+s;b.onclick=()=>{state.speed=s;document.querySelectorAll('.speed-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active')};els.timeline.appendChild(b)})
  }

  function beep(){if(!state.sound)return;try{const now=state.sound.currentTime,o=state.sound.createOscillator(),g=state.sound.createGain();o.type='sine';o.frequency.value=520;g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(.05,now+.01);g.gain.exponentialRampToValueAtTime(.0001,now+.08);o.connect(g).connect(state.sound.destination);o.start(now);o.stop(now+.09)}catch{}}
  function bindInput(){
    document.querySelectorAll('[data-panel]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');togglePanel(btn.dataset.panel)}));
    els.orbitToggle?.addEventListener('click',()=>{state.orbits=!state.orbits;els.orbitToggle.textContent=state.orbits?'ON':'OFF';els.orbitToggle.classList.toggle('off',!state.orbits);showEgg(state.orbits?'◌ Orbit aktif':'Orbit disembunyikan')});
    els.followToggle?.addEventListener('click',()=>{state.followSelected=!state.followSelected;els.followToggle.classList.toggle('active',state.followSelected);els.followToggle.textContent=state.followSelected?'FOLLOW':'FREE';if(state.followSelected&&state.selected){updateFollowTarget();showEgg('🎯 Kamera kembali mengikuti planet')}else{showEgg('🎥 Kamera bebas')}});
    els.focusHintClose?.addEventListener('click',()=>els.focusHint.classList.remove('show'));
    document.querySelectorAll('.panel-close').forEach(b=>b.addEventListener('click',closePanels));
    $('reset-camera-btn').onclick=resetView;$('sun-btn').onclick=()=>{focusOn('sun');openInfo('sun')};els.play.onclick=()=>{state.paused=!state.paused;els.play.textContent=state.paused?'▶':'❚❚'};
    els.fullscreen.onclick=async()=>{try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen();else await document.exitFullscreen()}catch{showEgg('Fullscreen diblokir browser. Gunakan F11.')}};
    els.audio.onclick=()=>{state.audio=!state.audio;els.audio.classList.toggle('active',state.audio);showEgg(state.audio?'🔊 Audio aktif':'🔈 Audio nonaktif');if(state.audio&&!state.sound){try{const A=window.AudioContext||window.webkitAudioContext;state.sound=new A()}catch{}}};
    els.timeSlider?.addEventListener('input',e=>{state.simDays=Number(e.target.value);state.paused=true;els.play.textContent='▶'});
    els.infoContent.addEventListener('click',e=>{const tab=e.target.closest('[data-info-tab]');if(tab){openInfo(tab.dataset.infoId,tab.dataset.infoTab);return;}if(e.target.closest('#focus-again-btn')&&state.selected){focusOn(state.selected);return;}});
    canvas.addEventListener('pointerdown',e=>{state.dragging=true;state.lastX=e.clientX;state.lastY=e.clientY;state.pointerDownX=e.clientX;state.pointerDownY=e.clientY;canvas.classList.add('dragging');canvas.setPointerCapture?.(e.pointerId)});
    canvas.addEventListener('pointermove',e=>{const rect=canvas.getBoundingClientRect();const hit=pick(e.clientX-rect.left,e.clientY-rect.top);state.hover=hit;els.tooltip.classList.toggle('show',!!hit);if(hit){els.tooltip.textContent=hit==='sun'?'Matahari':PLANETS.find(p=>p.id===hit)?.name||'';els.tooltip.style.left=e.clientX+'px';els.tooltip.style.top=e.clientY+'px'}if(!state.dragging)return;const dx=e.clientX-state.lastX,dy=e.clientY-state.lastY;state.lastX=e.clientX;state.lastY=e.clientY;state.yaw-=dx*.008;state.pitch=clamp(state.pitch-dy*.006,-1.2,1.2)});
    canvas.addEventListener('pointerup',e=>{state.dragging=false;canvas.classList.remove('dragging');canvas.releasePointerCapture?.(e.pointerId);if(Math.hypot(e.clientX-state.pointerDownX,e.clientY-state.pointerDownY)<6){const rect=canvas.getBoundingClientRect(),hit=pick(e.clientX-rect.left,e.clientY-rect.top);if(hit){if(state.audio)beep();focusOn(hit);openInfo(hit)}else{closeInfo();state.hover=null;els.tooltip.classList.remove('show');}}});
    canvas.addEventListener('pointercancel',()=>{state.dragging=false;canvas.classList.remove('dragging')});canvas.addEventListener('wheel',e=>{e.preventDefault();state.distance=clamp(state.distance*Math.exp(e.deltaY*.001),state.minDistance,state.maxDistance)},{passive:false});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeInfo();return}if(e.key===' '){e.preventDefault();state.paused=!state.paused;els.play.textContent=state.paused?'▶':'❚❚'}if(e.key.toLowerCase()==='r')resetView();if(e.key.toLowerCase()==='f'&&state.selected){state.followSelected=!state.followSelected;els.followToggle?.classList.toggle('active',state.followSelected);els.followToggle.textContent=state.followSelected?'FOLLOW':'FREE';if(state.followSelected)updateFollowTarget()}if(e.key.toLowerCase()==='b'){state.keyBuffer.push('b');if(state.keyBuffer.length>6)state.keyBuffer.shift();if(state.keyBuffer.join('')==='braja'){state.themeBoost=1;showEgg('✨ Mode Braja aktif');state.keyBuffer=[]}}});
    els.search.addEventListener('keydown',e=>{if(e.key!=='Enter')return;const q=els.search.value.trim().toLowerCase(),p=PLANETS.find(x=>x.name.toLowerCase()===q||x.nameEn.toLowerCase()===q||x.id===q);if(p){focusOn(p.id);openInfo(p.id)}else if(q==='matahari'||q==='sun'){focusOn('sun');openInfo('sun')}else{showEgg('Planet tidak ditemukan. Coba nama lain.')}})
  }

  function animate(now){const dt=Math.min(.05,Math.max(.001,(now-state.last)/1000));state.last=now;if(!state.paused){state.simDays=clamp(state.simDays+dt*state.speed,0,36525);if(state.autoRotate)state.yaw+=dt*.08}updateFocus(now);updateFollowTarget();render(now);state.fpsAccum+=dt;state.fpsFrames++;if(state.fpsAccum>=.5){state.fps=state.fpsFrames/state.fpsAccum;state.fpsAccum=0;state.fpsFrames=0}updateHud();drawMinimap();drawCompass();if(!state.firstFrame){state.firstFrame=true;setLoading(100,'Selesai');setTimeout(()=>els.loading?.classList.add('fade'),90);setTimeout(()=>els.loading?.remove(),450)}requestAnimationFrame(animate)}
  function setLoading(pct,text){if(els.loadingBar)els.loadingBar.style.width=`${pct}%`;if(els.loadingText)els.loadingText.textContent=text}
  function bootError(msg){const e=document.getElementById('boot-error'),t=document.getElementById('boot-error-text');if(e){e.hidden=false;t.textContent=msg;document.getElementById('reload-btn')?.addEventListener('click',()=>location.reload())}document.getElementById('loading-screen')?.remove()}
  window.addEventListener('error',e=>{if(!state.firstFrame)bootError('JavaScript mengalami error: '+(e.message||'unknown error'))});window.addEventListener('unhandledrejection',()=>{if(!state.firstFrame)bootError('Simulasi mengalami error saat mulai. Coba buka ulang index.html.')});setTimeout(()=>{if(!state.firstFrame&&els.loading)bootError('Waktu mulai terlalu lama. Pastikan ZIP diekstrak lengkap lalu buka index.html.')},5000);
  function boot(){setLoading(20,'Membangun orbit planet...');loadPlanetImages();buildUI();els.followToggle?.classList.toggle('active',state.followSelected);setLoading(60,'Menyiapkan kontrol 3D...');bindInput();setLoading(85,'Menyalakan simulasi...');requestAnimationFrame(animate)}
  boot();
})();
