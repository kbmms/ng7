function currentUrl() {
	const isLocalHost = window.location.href.includes('localhost')
	const isHomolog = window.location.href.includes('homolog')
	const isIP = window.location.href.includes('192.')

	if (isHomolog || isLocalHost || isIP)
		return 'http://127.0.0.1:3333'
	return 'https://postgres-fullstack.onrender.com'
}

const apiUrl = currentUrl()

export default apiUrl