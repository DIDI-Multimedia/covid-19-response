// var u;
// var u2;
// var count;
// var mods = [];

// function setup() {
//   createCanvas(windowWidth, windowHeight);

//   background('#000');
//   u = 200;
//   u2 = (u/2)*sqrt(1);
//   var highCount = (height/u)+3;
//   var wideCount = (width/u2)+3;
//   count = int(highCount * wideCount);
//   var index = 0;
//   for (var xc = 0; xc < wideCount*2; xc++) {
//     for (var yc = 0; yc < highCount*2; yc++) {
//       mods[index++] = new Module((int(xc)*u2*2),int(yc)*u);
//     }
//    }
// }

// function draw() {
//   noStroke();
//   for (var i = 0; i <= count; i++) {
//     mods[i].draw1();
//   }
//   translate(u2,u/2);
//   for (var i = 0; i <= count; i++) {
//     mods[i].draw3();
//   }
// }

// function mousePressed() {
//   for (var i = 0; i <= count; i++) {
//     mods[i].Pressed();
//   }
// }


// function Module(_x, _y) {
//   this.s = 40;
//   this.x1 = _x;
//   this.y1 = _y;
//   this.x3 = _x;
//   this.y3 = _y;
//   this.b1 = false;
//   this.b3 = false;
//   this.isOverCircle1 = false;
//   this.isOverCircle3 = false;
//   this.c1 = '#545861';
//   this.c3 = '#545861';
// }


// Module.prototype.draw1 = function() {
//   push();
//   translate(this.x1, this.y1);
//   rectMode(CENTER);
//   noStroke();
//   fill(0);
//   ellipse(0,0,this.s+1,this.s+1);
//   fill(this.c1);
//   ellipse(0,0,this.s,this.s);
//   this.px1 = mouseX;
//   this.py1 = mouseY;
//   this.nx1 = this.x1;
//   this.ny1 = this.y1;
//   this.isOverCircle1 = (this.px1>this.nx1-this.s/2 && this.px1<this.nx1+this.s/2 && this.py1>this.ny1-this.s/2 && this.py1<this.ny1+this.s/2);
//   if(this.isOverCircle1 === true)
//   {
//     fill('rgba(255, 255, 255, 0.2)');
//     ellipse(0,0,this.s,this.s);
//   } else {
//     noFill(); 
//   }
//   pop();
// }


// Module.prototype.draw3 = function() {
//   push();
//   translate(this.x3, this.y3);
//   rectMode(CENTER);
//   noStroke();
//   fill(0);
//   ellipse(0,0,this.s+1,this.s+1);
//   fill(this.c3);
//   ellipse(0,0,this.s,this.s);
//   this.px3 = mouseX;
//   this.py3 = mouseY;
//   this.nx3 = this.x3+u2;
//   this.ny3 = this.y3+(u/2);
//   this.isOverCircle3 = (this.px3>this.nx3-this.s/2 && this.px3<this.nx3+this.s/2 && this.py3>this.ny3-this.s/2 && this.py3<this.ny3+this.s/2);  
//   if(this.isOverCircle3 === true)
//   {
//     fill('rgba(255, 255, 255, 0.2)');
//     ellipse(0,0,this.s,this.s);
//   } else {
//     noFill(); 
//   }
//   pop();
// }


// Module.prototype.Pressed = function() {
//     if (this.isOverCircle1 === true){
//       if(this.b1 === false){
//       this.c1 = '#FFF0BD';
//       this.b1 = true;
//       } else {
//       this.c1 = '#545861';
//       this.b1 = false; 
//       }
//     }
//     if (this.isOverCircle3 === true){
//       if(this.b3 === false){
//       this.c3 = '#FFF0BD';
//       this.b3 = true;
//       } else {
//       this.c3 = '#545861';
//       this.b3 = false; 
//       }
//     }
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   background('#000');

// }

stepInfection = function*(points) {
  const originPoint = {x: 0, y: 0}
  
  function angleBetween(a1, a2) {
    const diff = Math.abs(a2 - a1) % (2 * Math.PI)
    return diff < Math.PI ? diff : diff  - Math.PI
  }
  
  function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  }
  
  const maxDistance = 1.5 * (circleR + 2 * circleSpacing + 2 * variance)
  
  const randomInfectionTime = d3.randomNormal(infectionTMu, infectionTSigma)
  const randomInfectionCount = d3.randomNormal(infectionMMu, infectionMSigma)
  
  const delaunay = d3.Delaunay.from(points, p => p.x, p => p.y)
  
  const activeInfected = new Set(points.filter(p => p.infectionTime > 0))
  
  function infect(p, by) {
    let prevented = false
    if (p.isCountermeasures && Math.random() < countermeasuresEffect) {
      p.countermeasuresHits++
      changedPoints.push(p)
      prevented = true
    }
    if (by !== originPoint) {
      const edgeKey = `${by.idx}->${p.idx}`
      changedEdges.set(edgeKey, {
        key: edgeKey,
        x1: by.x,
        y1: by.y,
        x2: p.x,
        y2: p.y,
        halted: p.infected || prevented,
      })
    }
    if (p.infected || prevented) {
      return
    }
    p.infected = true
    p.infectedBy = by || originPoint
    p.infectionTime = Math.round(randomInfectionTime())
    p.infectionCount = Math.round(randomInfectionCount())
    by.infectionCount--
    activeInfected.add(p)
    changedPoints.push(p)
  }
  
  let tick = 0
  let changedPoints = []
  let changedEdges = new Map()
  let stats = []
  
  function stepData(pointsOverride) {
    stats.push({
      tick: tick++,
      infectedCount: activeInfected.size,
    })
    return {
      changedPoints: pointsOverride || changedPoints,
      changedEdges: [...changedEdges.values()],
      stats,
    }
  }
    
  yield stepData(points)
        
  // Infect initial ring.
  points.filter(p => p.ring === ringStart).forEach(p => infect(p, originPoint))
  
  yield stepData(changedPoints)
  
  while (activeInfected.size) {
    changedPoints = []
    changedEdges = new Map()
    
    for (const p of [...activeInfected]) {
      changedPoints.push(p)
      p.infectionTime--
      if (p.infectionTime <= 0) {
        activeInfected.delete(p)
        continue
      }
      if (p.ring === ringCount + ringStart - 1) {
        continue
      }
      const neighbors = _.shuffle([...delaunay.neighbors(p.idx)])
      for (const neighborIdx of neighbors) {
        if (p.infectionCount <= 0) {
          break
        }
        const neighbor = points[neighborIdx]
        if (neighbor === p.infectedBy) {
          // No tag-backs.
          continue
        }
        if (distance(p.x, p.y, neighbor.x, neighbor.y) > maxDistance) {
          continue
        }
        const byAngle = Math.atan2(p.y - p.infectedBy.y, p.x - p.infectedBy.x)
        const toAngle = Math.atan2(neighbor.y - p.y, neighbor.x - p.x)
        const similarity = 1 - (angleBetween(byAngle, toAngle) / Math.PI)
        if (similarity < angleThreshold[1] && Math.random() > (similarity - angleThreshold[0]) * (angleThreshold[1] - angleThreshold[0])) {
          continue
        }
        if (Math.random() < infectionP) {
          infect(neighbor, p)
        }
      }
    }
          
    yield stepData()
  }
}
startPoints = function({useDistancing, useCountermeasures}) {
  let data = []  
  const ringEnd = ringCount + ringStart
  const ringEndInner = useDistancing ? ringEnd : ringEnd - outerRings
  for (let ringIdx = ringStart; ringIdx < ringEndInner; ringIdx++) {
    const circleSize = 2 * (circleR + circleSpacing)
    const ringRadius = ringIdx * circleSize
    const arcAngle = Math.PI / 2
    const arcLength = arcAngle * ringRadius - 2 * variance
    const count = Math.floor(arcLength / circleSize)
    const circleSpace = count * circleSize
    const centeringSpace = (arcLength - circleSpace) / arcLength
    // We add circleSize / 2 because circles are positioned from their centers.
    const centeringOffset = centeringSpace / 2 + (circleSize / 2) / arcLength
    
    for (let circleIdx = 0; circleIdx < count; circleIdx++) {
      const angle = arcAngle * ((circleIdx / count) * (1 - centeringSpace) + centeringOffset)
      const distanceFromCenter = ((ringIdx - ringStart) / ringEndInner)
      const point = {
        x: ringRadius * Math.cos(angle) + (2 * Math.random() - 1) * variance,
        y: ringRadius * Math.sin(angle) + (2 * Math.random() - 1) * variance,
        ring: ringIdx,
        isDistancing: useDistancing && ringIdx < ringEnd - outerRings && Math.random() < distancingUse,
        isCountermeasures: useCountermeasures && Math.random() < countermeasuresUse * distanceFromCenter,
        countermeasuresHits: 0,
      }
      data.push(point)
    }
  }
  
  if (useDistancing) {
    const candidates = _.shuffle(data.filter(p => p.ring >= ringEnd - outerRings))
    const distanced = data.filter(p => p.isDistancing && p.ring < ringEnd - outerRings)
    for (const p of distanced) {
      p.removed = true
      candidates.pop()
    }
    for (const p of candidates) {
      p.removed = true
    }
    
    data = data.filter(p => !p.removed)
  }
  
  for (const [i, p] of data.entries()) {
    p.idx = i
  }
  
  return data
}