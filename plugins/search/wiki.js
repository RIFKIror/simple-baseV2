import axios from 'axios'

async function wikiSearch(query) {
  try {
    if (!query) {
      throw new Error('Query wajib diisi.')
    }

    const headers = {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
      accept: 'application/json',
      'accept-language': 'id-ID,id;q=0.9,en;q=0.8'
    }
    const { data: searchData } = await axios.get('https://id.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          srsearch: query,
          format: 'json',
          utf8: 1,
          origin: '*'
        },
        headers
      }
    )

    const first = searchData?.query?.search?.[0]
    if (!first) {
      throw new Error('Artikel tidak ditemukan.')
    }

    const title = first.title
    const { data } = await axios.get('https://id.wikipedia.org/w/api.php',
      {
        params: {
          action: 'query',
          prop: 'extracts|pageimages|categories|info',
          exintro: 1,
          explaintext: 1,
          piprop: 'original',
          cllimit: 5,
          inprop: 'url',
          titles: title,
          format: 'json',
          utf8: 1,
          origin: '*'
        },
        headers
      }
    )
    const page = Object.values(data.query.pages)[0]
    return {
      title: page.title,
      summary: page.extract || 'Tidak ada deskripsi.',
      image: page.original?.source || null,
      category:
        page.categories?.map(v =>
          v.title.replace('Kategori:', '')
        ) || [],
      url: page.fullurl || null
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

let handler = async (conn,m,{text,command,prefix}) => {
  try {
    if (!text) {
      return await conn.sendMessage(m.chat, {
          text: `❌ *Contoh Penggunaan*:\n\n${prefix + command} Werner Heisenberg`
        },
        { quoted: m })
    }
    await conn.sendMessage(
      m.chat,
      {
        text: '⏳ Searching Wikipedia...'
      },
      { quoted: m }
    )
    const res = await wikiSearch(text)
    const categories = res.category.length
      ? res.category
          .map(v => `• ${v}`)
          .join('\n')
      : '• Tidak tersedia'

    const caption = `
*Wikipedia Search*

📚 *Title:*
${res.title}

📝 *Summary:*
${res.summary}

📂 *Category:*
${categories}

🔗 *Wikipedia URL:*
${res.url}

> © ${global.nameBot}`.trim()
    await conn.sendMessage(m.chat, {
        image: { url: res.image },
        caption,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363424411396051@newsletter',
            newsletterName: 'Wikipedia Search',
            serverMessageId: 1
          }
        }
      },
      { quoted: m })
  } catch (e) {
    console.log(e)
    await conn.sendMessage(m.chat, {
        text:
`❌ *Wikipedia Search Error*

📌 *Details :*
${e.message}`
      },
      { quoted: m })
  }
}

handler.command = ['wiki']
handler.help = ['wiki <query>']
handler.tag = ['search']

export default handler