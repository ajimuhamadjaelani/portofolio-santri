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
    return <div>Santri tidak ditemukan</div>
  }

  // ambil karya
  const { data: karya } = await supabase
    .from('karya')
    .select('*')
    .eq('santri_id', santri.id)

  return (
    <div style={{ padding: 20 }}>
      <h1>{santri.nama}</h1>

      {karya?.map((item) => (
        <div key={item.id}>
          <h3>{item.judul}</h3>
          <p>{item.deskripsi}</p>
          <a href={item.link}>Lihat</a>
        </div>
      ))}
    </div>
  )
}