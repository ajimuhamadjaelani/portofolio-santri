import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string }
}) {
  const page = Number(searchParams?.page || 1)
  const limit = 15
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data: santri } = await supabase
    .from('santri')
    .select('*')
    .range(from, to)

  return (
    <div style={{ padding: 20 }}>
      <h1>Daftar Santri</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 15,
          marginTop: 20,
        }}
      >
        {santri?.map((item) => (
          <Link
            key={item.id}
            href={`/${item.username}`}
            style={{
              border: '1px solid #ddd',
              padding: 15,
              borderRadius: 10,
              textDecoration: 'none',
              color: 'black',
            }}
          >
            <h3>{item.nama}</h3>
            <p>@{item.username}</p>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        {page > 1 && <Link href={`/?page=${page - 1}`}>⬅️ Prev</Link>}

        <span style={{ margin: '0 10px' }}>Halaman {page}</span>

        {santri?.length === 15 && (
          <Link href={`/?page=${page + 1}`}>Next ➡️</Link>
        )}
      </div>
    </div>
  )
}