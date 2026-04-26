'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Santri() {
  const [nama, setNama] = useState('')
  const [username, setUsername] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase
      .from('santri')
      .insert([
        {
          nama,
          username,
        },
      ])

    if (error) {
      alert('Gagal tambah santri')
      console.log(error)
    } else {
      alert('Santri berhasil ditambahkan')
      setNama('')
      setUsername('')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Tambah Santri</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />

        <button type="submit">Simpan</button>
      </form>
    </div>
  )
}