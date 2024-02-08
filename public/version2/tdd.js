


    let ary=[]
    ary.push({
        x: 490,
        y: 28,
        w: 230,
        h: 200,
    }
    ); ary.push({
        x: ary[0].x +  ary[0].w,
        y: 28,
        w: 250,
        h: 200 + ( ary[0].h / 3),
    }
    ); ary.push({
        x: 830,
        y: 290,
        w: 140,
        h: 280,
    }
    ); ary.push({
        x: ary[1].x,
        y:  ary[0].h + 95,
        w: 120,
        h: 260,
    }
    ); ary.push({
        x:  ary[0].x,
        y:  ary[0].y +  ary[0].h,
        w: 230,
        h: 340,
    })


ary.forEach((thing,i )=> { 
    console.log( thing)
})



const x1 = 490
const x2 = 970
const y1 = 28
const y2 = 290 + 280
const y3 = 295 + 260

console.log( x1, x2, y1, y2 )