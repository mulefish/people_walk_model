function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  try {
      const xsButton = document.querySelector('span.sizeTile-bFZ56');
      if (xsButton) {
          xsButton.click();
          let t1 =. new Date().getTime() 
           await sleep(1000); 
          const duration = new Date().getTime() - t1 
          console.error("duration " + duration )
          
          let ok = 0
          let bad = 0
          for (let k in s) {
              if (k.startsWith("eVar")) {
                  const v = s[k]
                  if (v === undefined) {
                      bad++
                  } else {
                      // console.error( k, v )
                      ok++
                  }
              }
          }
          if (ok > 1) {
              console.error("PDP PAGE ok=" + ok + " bad=" + bad)
              return true
          } else {
              console.error("PDP PAGE ok=" + ok + " bad=" + bad)
              return false
          }
      } else {
          console.error('XS button not found.');
          return false
      }
  
  } catch (boom) {
      return false
  }