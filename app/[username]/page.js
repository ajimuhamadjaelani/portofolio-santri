import { supabase } from '@/lib/supabase'

export default async function Page({ params }) {
  const username = params.username

  const { data: santri } = await supabase
    .from('santri')
    .select('*')
    .eq('username', username)
    .single()

  if (!santri) {
    return <h1>Santri tidak ditemukan</h1>
  }

  const { data: karya } = await supabase
    .from('karya')
    .select('*')
    .eq('santri_id', santri.id)

  return (
    <div style={{ padding: 20 }}>
      <h1>{santri.nama}</h1>
      <p>@{santri.username}</p>

      <hr />

      <h2>Karya:</h2>

      {karya?.length > 0 ? (
        karya.map((k) => (
          <div key={k.id} style={{
            border: '1px solid #ddd',
            padding: 10,
            marginBottom: 10,
            borderRadius: 8
          }}>
            <h3>{k.judul}</h3>
            <p>{k.deskripsi}</p>
          </div>
        ))
      ) : (
        <p>Belum ada karya</p>
      )}
    </div>
  )
}