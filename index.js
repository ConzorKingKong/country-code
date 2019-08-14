/**
 * This helper returns a response based on the country code
 * @param {Request} request
 * @param {string} strategy
 */
function redirect(request, strategy) {
  const country = request.headers.get('cf-ipcountry')
  const url = new URL(request.url)
  if (strategy === 'subdomain') {
    url.hostname = `${country}.${url.hostname}`
  } else if (strategy === 'path') {
    url.pathname = `${country}${url.pathname}`
  }
  return Response.redirect(url, 302)
}

/**
 * Redirects a visitor to the website that correlates with their country code
 * @param {Request} request
 */
async function handleRequest(request) {
  return redirect(request, 'subdomain')
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
