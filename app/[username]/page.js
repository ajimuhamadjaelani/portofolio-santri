'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Page({ params }) {
  const { username } = params

  const [santri, setSantri] = useState(null)
  const [karya, setKarya] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const getData = async () => {
      // ambil santri
      const { data: santriData } = await supabase
        .from('santri')
        .select('*')
        .eq('username', username)
        .single()

      if (!santriData) return

      setSantri(santriData)

      // ambil karya
      const { data: karyaData } = await supabase
        .from('karya')
        .select('*')
        .eq('santri_id', santriData.id)

      setKarya(karyaData || [])
    }

    getData()
  }, [username])

  if (!santri) {
    return (
      <div style={styles.center}>
        <h2>Santri tidak ditemukan</h2>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>{santri.nama}</h1>
        <p style={styles.username}>@{santri.username}</p>

        <div style={styles.grid}>
          {karya.map((item) => (
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

              <button
                onClick={() => item.foto && setSelectedImage(item.foto)}
                style={styles.button}
              >
                Lihat →
              </button>

            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedImage && (
        <div
          style={styles.modal}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            style={styles.modalImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

const styles = {
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
    color: '#4ea1ff'
  },

  username: {
    color: '#aaa',
    marginBottom: 20
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
    borderRadius: 12
  },

  image: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderRadius: 10,
    marginBottom: 10
  },

  cardTitle: {
    color: '#4ea1ff'
  },

  cardDesc: {
    color: '#ccc',
    fontSize: 14
  },

  button: {
    marginTop: 10,
    background: '#4ea1ff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 6,
    color: '#fff',
    cursor: 'pointer'
  },

  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },

  modalImage: {
    maxWidth: '90%',
    maxHeight: '90%',
    borderRadius: 10
  },

  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }
}


const styles = {
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
    color: '#4ea1ff'
  },

  username: {
    color: '#aaa',
    marginBottom: 20
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
    borderRadius: 12
  },

  image: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderRadius: 10,
    marginBottom: 10
  },

  cardTitle: {
    color: '#4ea1ff'
  },

  cardDesc: {
    color: '#ccc',
    fontSize: 14
  },

  button: {
    marginTop: 10,
    background: '#4ea1ff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 6,
    color: '#fff',
    cursor: 'pointer'
  },

  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },

  modalImage: {
    maxWidth: '90%',
    maxHeight: '90%',
    borderRadius: 10
  },

  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }
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