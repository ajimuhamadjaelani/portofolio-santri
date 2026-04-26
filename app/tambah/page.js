'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TambahKarya() {
  const [form, setForm] = useState({
    username: '',
    nama: '',
    judul: '',
    deskripsi: '',
    link: '',
    foto: null
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleFile = (e) => {
    setForm({
      ...form,
      foto: e.target.files[0]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { username, nama, judul, deskripsi, link, foto } = form

    // 1. cek santri
    let { data: santri } = await supabase
      .from('santri')
      .select('*')
      .eq('username', username)
      .single()

    let santriId

    // 2. kalau belum ada → buat santri
    if (!santri) {
      const { data: newSantri, error } = await supabase
        .from('santri')
        .insert([{ username, nama }])
        .select()
        .single()

      if (error) {
        alert('Gagal buat santri')
        return
      }

      santriId = newSantri.id
    } else {
      santriId = santri.id
    }

    // 3. upload foto ke storage
    let fotoUrl = null

    if (foto) {
      const fileName = `${Date.now()}-${foto.name}`

      const { error: uploadError } = await supabase.storage
        .from('karya-foto')
        .upload(fileName, foto)

      if (uploadError) {
        alert('Upload foto gagal')
        return
      }

      const { data } = supabase.storage
        .from('karya-foto')
        .getPublicUrl(fileName)

      fotoUrl = data.publicUrl
    }

    // 4. simpan karya
    const { error: karyaError } = await supabase
      .from('karya')
      .insert([
        {
          santri_id: santriId,
          judul,
          deskripsi,
          link,
          foto: fotoUrl
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
        link: '',
        foto: null
      })
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Tambah Karya</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="nama"
          placeholder="Nama"
          value={form.nama}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="judul"
          placeholder="Judul Karya"
          value={form.judul}
          onChange={handleChange}
          required
        />
        <br /><br />

        <textarea
          name="deskripsi"
          placeholder="Deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="link"
          placeholder="Link"
          value={form.link}
          onChange={handleChange}
        />
        <br /><br />

        {/* FOTO INPUT */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
        />
        <br /><br />

        <button type="submit">
          Simpan
        </button>
      </form>
    </div>
  )
}