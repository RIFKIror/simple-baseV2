import axios from 'axios'

async function movieSearch(query) {
  try {
    if (!query) throw new Error('Query kosong')
    const API_KEY = '87b33e09'
    const keyword = query.trim()
    const { data } = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: API_KEY,
        s: keyword
      }
    })

    if (data.Response === 'False') {
      throw new Error(data.Error)
    }

    const limited = data.Search.slice(0, 5)

    const results = await Promise.all(
      limited.map(async (film) => {
        const { data: d } = await axios.get(
          'https://www.omdbapi.com/',
          {
            params: {
              apikey: API_KEY,
              i: film.imdbID
            }
          }
        )

        return {
          title: d.Title,
          year: d.Year,
          imdbID: d.imdbID,
          type: d.Type,
          poster: d.Poster !== 'N/A'
              ? d.Poster
              : null,
          genre: d.Genre,
          runtime: d.Runtime,
          rating: d.imdbRating,
          votes: d.imdbVotes,
          plot: d.Plot,
          url: `https://www.imdb.com/title/${d.imdbID}/`
        }
      })
    )

    return {
      success: true,
      query: keyword,
      total: results.length,
      results
    }
  } catch (err) {
    return {
      success: false,
      message: 'Gagal search movie',
      error: err.message
    }
  }
}

let handler = async (conn,m,{ text, prefix, command }) => {
  try {
    if (!text) {
      return await conn.sendMessage(
        m.chat,
        {
          text:
`*Contoh Penggunaan*

${prefix + command} The Godfather`
        },
        { quoted: m }
      )
    }

    await conn.sendMessage(
      m.chat,
      {
        text: '⏳ Searching movie...'
      },
      { quoted: m }
    )

    const res = await movieSearch(text)

    if (!res.success) {
      throw new Error(res.error)
    }

    const movie = res.results[0]

const caption = `
*MOVIE SEARCH RESULT*

▢ *Title :* ${movie.title}
▢ *Year :* ${movie.year}
▢ *Type :* ${movie.type}
▢ *Genre :* ${movie.genre}
▢ *Runtime :* ${movie.runtime}

▢ *IMDb Rating :* ${movie.rating}
▢ *Votes :* ${movie.votes}

▢ *Plot :*
${movie.plot}

▢ *IMDb URL :*
${movie.url}
`.trim()

await conn.sendMessage(
  m.chat,
  {
    image: {
      url: movie.poster
    },
    caption,
    contextInfo: {
      forwardingScore: 999999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterName: movie.title,
        newsletterJid:
          '120363420019948650@newsletter'
      }
    }
  },
  { quoted: m }
)
  } catch (e) {
    console.log(e)
    await conn.sendMessage(
      m.chat,
      {
        text:
`❌ *Movie Search Error*

📌 *Details :*
${e.message}`
      },
      { quoted: m }
    )
  }
}

handler.command = ['movie', 'film']
handler.help = ['movie <judul>']
handler.tag = ['search']

export default handler