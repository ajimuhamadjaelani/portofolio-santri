import { supabase } from '../../lib/supabase'

export default async function Page({ params }) {
  const { username } = await params

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

        <div style={styles.grid}>
          {karya?.map((item) => (
  

<div key={item.id} style={styles.card}>
  
  {item.foto && (
    <img
      src={item.foto}
      alt={item.judul}
      style={styles.image}
    />
  )}

  <h3 style={styles.cardTitle}>{item.judul}</h3>
  <p style={styles.cardDesc}>{item.deskripsi}</p>

  <a href={item.link} style={styles.link}>
    Lihat →
  </a>
</div>




          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
image: {
  width: '100%',
  height: 500,
  objectFit: 'cover',
  borderRadius: 10,
  marginBottom: 10,
  border: '1px solid #1f2a44'
},

  page: {
    minHeight: '100vh',
    background: '#0b0f19',
    color: '#fff',
    padding: 20,
    fontFamily: 'Arial, sans-serif'
  },

  container: {
    maxWidth: 900,
    margin: '0 auto'
  },

  title: {
    fontSize: 32,
    marginBottom: 20,
    color: '#4ea1ff',
    borderBottom: '2px solid #1f2a44',
    paddingBottom: 10
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 15
  },

  card: {
    background: '#121a2a',
    border: '1px solid #1f2a44',
    padding: 15,
    borderRadius: 12,
    transition: '0.3s',
    boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
  },

  cardTitle: {
    color: '#4ea1ff',
    marginBottom: 8
  },

  cardDesc: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10
  },

  link: {
    color: '#4ea1ff',
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