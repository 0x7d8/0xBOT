export function set(cname, cval, exdays) {
  // Format Cookie Content
  let cvalue = cval
  cvalue = cvalue.replace(';', '/#SEMICOLON#/')
  cvalue = cvalue.replace('=', '/#EQUALS#/')
  cvalue = cvalue.replace('?', '/#QUESTION#/')
  cvalue = cvalue.replace('&', '/#ANDSYMBOL#/')

  const d = new Date()
  d.setTime(d.getTime() + (exdays*24*60*60*1000))
  let expires = "expires="+ d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;domain=0xbot.de"
}

export function get(cname) {
  let name = cname + "="
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      // Format Cookie Content
      let output = c.substring(name.length, c.length)
      output = output.replace('/#SEMICOLON#/', ';')
      output = output.replace('/#EQUALS#/', '=')
      output = output.replace('/#QUESTION#/', '?')
      output = output.replace('/#ANDSYMBOL#/', '&')

      return output
    }
  }
  return ""
}