/**
function _postedAgo
@params created
@returns string
Return time since post created
**/

export function _postedAgo(time){
   let d = new Date(time*1000);
   let n = d.getTime();
   let seconds = (Date.now()-n)/1000
   if(seconds<60) {
     return "few seconds ago"
   }
   if(seconds<3600) {
     return Math.floor(seconds/60) + (Math.floor(seconds/60) > 1 ? ' minutes ago' : ' minutes ago')
   }
   if(seconds<3600*24) {
     return Math.floor(seconds/3600) + (Math.floor(seconds/3600) > 1 ? " hours ago" : ' hour ago')
   }
   if(seconds<3600*24*30) {
     return Math.floor(seconds/(3600*24)) + (Math.floor(seconds/(3600*24)) > 1 ? ' days ago' : ' day ago')
   }
   if(seconds<3600*24*365) {
     return Math.floor(seconds/(3600*24*30)) + (Math.floor(seconds/(3600*24*30)) > 1 ?  ' months ago' : " month ago")
  }
  return Math.floor(seconds/(3600*24*365)) + (Math.floor(seconds/(3600*24*365)) > 1 ? ' years ago' : ' year ago')
}


/**
function _isValidURL
@params str
@returns boolean
Returns boolean if param is a valid url.
**/
export function _isValidURL(str){
  var pattern = new RegExp('^(https?:\\/\\/)?'+
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
      '((\\d{1,3}\\.){3}\\d{1,3}))'+
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
      '(\\?[;&a-z\\d%_.~+=-]*)?'+
      '(\\#[-a-z\\d_]*)?$','i');
  return !!pattern.test(str);
}


/**
function _decodeHtml
@params selfText
@returns string
Replaces entity characters from param and returns in readable format
**/
export function _decodeHtml(selfText) {
  return selfText
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'")
    .replace(/&#x200B;/gi, "  ")

}
