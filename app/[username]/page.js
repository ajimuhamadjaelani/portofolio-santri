import { supabase } from '../../lib/supabase'

export default async function Page({ params }) {
  const { username } = params

  // cari santri
  const { data: santri } = await supabase
    .from('santri')
    .select('*')
    .eq('username', username)
    .single()

  if (!santri) {
    return (
      <div style={styles.center}>
        <h2>Santri tidak ditemukan</h2>
      </div>
    )
  }

  // ambil karya
  const { data: karya } = await supabase
    .from('karya')
    .select('*')
    .eq('santri_id', santri.id)

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <h1 style={styles.title}>{santri.nama}</h1>
        <p style={styles.subtitle}>@{santri.username}</p>

        <div style={styles.grid}>
          {karya?.map((item) => (
            <div key={item.id} style={styles.card}>
              <h3 style={styles.cardTitle}>{item.judul}</h3>
              <p style={styles.cardDesc}>{item.deskripsi}</p>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  style={styles.link}
                >
                  Lihat Karya →
                </a>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0b0f19, #0f172a)',
    color: '#fff',
    padding: 20,
    fontFamily: 'Arial, sans-serif'
  },

  container: {
    maxWidth: 900,
    margin: '0 auto'
  },

  title: {
    fontSize: 34,
    marginBottom: 5,
    color: '#4ea1ff'
  },

  subtitle: {
    color: '#94a3b8',
    marginBottom: 25
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 15
  },

  card: {
    background: '#111827',
    border: '1px solid #1f2a44',
    padding: 15,
    borderRadius: 12,
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    transition: '0.3s'
  },

  cardTitle: {
    color: '#4ea1ff',
    marginBottom: 8
  },

  cardDesc: {
    color: '#cbd5e1',
    fontSize: 14,
    marginBottom: 10
  },

  link: {
    color: '#60a5fa',
    textDecoration: 'none',
    fontWeight: 'bold'
  },

  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#0b0f19',
    color: '#fff'
  }
}