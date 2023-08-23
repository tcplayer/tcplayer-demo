const getUrlParameter = (name) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(window.location.search);
  return results === null ? '' : filterXSS(decodeURIComponent(results[1].replace(/\+/g, ' ')));
};

export const filterXSS = (oriStr) => {
  if(!oriStr){
    return oriStr;
  }
  const charCodes=['3c','3e','27','22','28','29','60',{format:'script{}',chr:'3a'}];//要转义字符的16进制ASCII码[1< 2> 3' 4" 5( 6) 7`]
  const xssChars: any=[];
  const filterChars: any=[];
  let tmpFormat: any='{}';
  let tmpChr;
  for(var i=0;i<charCodes.length;i++){
    if('string'==typeof charCodes[i]){
      tmpFormat='{}';
      tmpChr=charCodes[i];
    }else{
      // @ts-ignore
      tmpFormat=charCodes[i].format;
      // @ts-ignore
      tmpChr=charCodes[i].chr
    }
    xssChars.push(tmpFormat.replace('{}','\\u00'+tmpChr));
    xssChars.push(tmpFormat.replace('{}','%'+tmpChr));//1次encode
    xssChars.push(tmpFormat.replace('{}','%25'+tmpChr));//2次encode
    filterChars.push(tmpFormat.replace('{}','&#x'+tmpChr+';'));
    filterChars.push(tmpFormat.replace('{}','%26%23x'+tmpChr+'%3B'));//1次encode
    filterChars.push(tmpFormat.replace('{}','%2526%2523x' + tmpChr + '%253B'));//2次encode
  }
  for(var i=0;i<xssChars.length;i++){
    oriStr=oriStr.replace(new RegExp(xssChars[i],'gi'),filterChars[i]);
  }
  //预防script:
  oriStr=oriStr.replace(/script[\u000d\u000a\u0020]+\:/,'script:');
  return oriStr;
}


const loadScript = (src, callback, attrs, remove = false) => {
  let tag: any = document.createElement("script");

  tag.onload = tag.onreadystatechange = function() {
    if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
      if (typeof callback == "function") {
        callback();
      }
      tag.onload = tag.onreadystatechange = null;

      if (tag.parentNode && !remove) {
        tag.parentNode.removeChild(tag);
      }
    }
  };
  if(attrs){
    for (let k in attrs) {
      if (!attrs.hasOwnProperty(k)) continue;
      let attr = attrs[k];
      if (attr === null)
        tag.removeAttribute(attr);
      else
        tag.setAttribute(k, attr);
    }
  }
  tag.src = src;
  document.getElementsByTagName("head")[0].appendChild(tag);
}




export {
  getUrlParameter,
  loadScript,
}

