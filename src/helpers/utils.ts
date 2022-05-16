export function getWebhook(webhookUrl: string) {
	let link = webhookUrl
	link = link.slice(8, link.length)
	const fields = link.split('/')
	if (fields[2] != 'webhooks') return
	const wwebhookId = fields[3]
	const webhookToken = fields[4]
	return { id: wwebhookId, token: webhookToken }
}