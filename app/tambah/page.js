'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TambahKarya() {
  const [form, setForm] = useState({
    username: '',
    nama: '',
    judul: '',
    deskripsi: '',
    link: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { username, nama, judul, deskripsi, link } = form

    // 1. cek santri
    let { data: santri, error } = await supabase
      .from('santri')
      .select('*')
      .eq('username', username)
      .single()

    let santriId

    // 2. kalau belum ada → buat
    if (!santri) {
      const { data: newSantri, error: errInsert } = await supabase
        .from('santri')
        .insert([{ username, nama }])
        .select()
        .single()

      if (errInsert) {
        alert('Error buat santri')
        return
      }

      santriId = newSantri.id
    } else {
      santriId = santri.id
    }

    // 3. simpan karya
    const { error: karyaError } = await supabase
      .from('karya')
      .insert([
        {
          santri_id: santriId,
          judul,
          deskripsi,
          link
        }
      ])

    if (karyaError) {
      alert('Gagal simpan karya')
    } else {
      alert('Berhasil simpan karya 🎉')
      setForm({
        username: '',
        nama: '',
        judul: '',
        deskripsi: '',
        link: ''
      })
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Tambah Karya</h1>

      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <br /><br />

        <input name="nama" placeholder="Nama" value={form.nama} onChange={handleChange} />
        <br /><br />

        <input name="judul" placeholder="Judul Karya" value={form.judul} onChange={handleChange} required />
        <br /><br />

        <textarea name="deskripsi" placeholder="Deskripsi" value={form.deskripsi} onChange={handleChange} />
        <br /><br />

        <input name="link" placeholder="Link" value={form.link} onChange={handleChange} />
        <br /><br />

        <button type="submit">Simpan</button>
      </form>
    </div>
  )
}