import axios from 'axios'

async function githubStalk(username) {
  try {
    if (!username) {
      throw new Error('Username required')
    }

    const { data } = await axios.get(`https://api.github.com/users/${username}`,
      {
        headers: {
          accept: 'application/vnd.github+json',
          'user-agent': 'Mozilla/5.0'
        }
      }
    )

    return {
      success: true,
      identity: {
        username: data.login,
        name: data.name || '-',
        id: data.id,
        node_id: data.node_id,
        profile_url: data.html_url,
        avatar: data.avatar_url
      },
      profile: {
        bio: data.bio || '-',
        location: data.location || '-',
        company: data.company || '-',
        blog: data.blog || '-',
        hireable: data.hireable ?? false
      },
      stats: {
        public_repos: data.public_repos,
        public_gists: data.public_gists,
        followers: data.followers,
        following: data.following
      },
      activity: {
        created_at: data.created_at,
        updated_at: data.updated_at,
        type: data.type,
        admin: data.site_admin
      }

    }

  } catch (e) {
    return {
      success: false,
      error:
        e.response?.data?.message ||
        e.message
    }
  }
}

let handler = async (conn,m,{args,command,prefix}) => {

  try {
    const username = args[0]
    if (!username) {
      return await conn.sendMessage(m.chat, {
          text:
`*Contoh Penggunaan*

${prefix + command} RIFKIror`
        },
        { quoted: m })
    }

    const res = await githubStalk(username)
    if (!res.success) {
      throw new Error(res.error)
    }

    const {identity,profile,stats,activity} = res
    const caption = `
*GitHub Stalker*

*👤 Identity*
• *Username :* ${identity.username}
• *Display Name :* ${identity.name}
• *ID :* ${identity.id}
• *Node ID :* ${identity.node_id}

*📋 Profile*
• *Bio :* ${profile.bio}

• *Location :* ${profile.location}
• *Company :* ${profile.company}
• *Website :* ${profile.blog || '-'}
• *Hireable :* ${profile.hireable}

*📊 Statistics*
• *Public Repositories :* ${stats.public_repos}
• *Public Gists :* ${stats.public_gists}
• *Followers :* ${stats.followers}
• *Following :* ${stats.following}

*⚡ Activity*
• *Account Type :* ${activity.type}
• *GitHub Admin :* ${activity.admin}
• *Created At :* ${activity.created_at}
• *Updated At :* ${activity.updated_at}

*🔗 Profile URL*
${identity.profile_url}`
    await conn.sendMessage(m.chat, {
        image: {
          url: identity.avatar
        },
        caption,
        contextInfo: {
          forwardingScore: 999999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363419065399999@newsletter',
            newsletterName: 'Github Stalker',
            serverMessageId: 1
          }
        }
      },
      { quoted: m })
  } catch (e) {
    console.log(e)
    await conn.sendMessage(m.chat, {
        text:
`❌ *GitHub Stalk Error*

📌 *Details :*
${e.message}`
      },
      { quoted: m })
   }
}

handler.command = ['ghstalk']
handler.help = ['ghstalk <username>']
handler.tag = ['stalk']

export default handler