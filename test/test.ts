import { Connection, inArray, node, relation } from 'cypher-query-builder'

const main = async () => {
  const conn = new Connection('neo4j+s://f2bb2c9d.databases.neo4j.io', {
    username: 'neo4j',
    password: 'oYgLYOJNZqbemx73y9-MTLIuourAsGXNgKkiRgaAL6I',
  })

  //   const query = conn
  //     .matchNode('g', 'EventGraph', { name: '1' })
  //     .match([node('g'), relation('out', ['CONTAINS']), node('e', 'Event')])
  //     .match([node('a', 'Event'), relation('out', 'r'), node('b', 'Event')])
  //     .raw('WHERE (g)-->(a) AND (g)-->(b)')
  //     .return({
  //       g: 'graph',
  //       e: 'event',
  //       r: 'relation',
  //     })

  const query = conn
    .createNode('g', 'EventGraph', { name: '2' })
    .set({
      variables: {
        'g.id': 'apoc.create.uuid()',
      },
    })
    .with('g')
    .matchNode('e', 'Event')
    .where({ 'e.id': inArray(['1', '2', '3']) })
    .create([
      node('g'), relation('out', 'r', 'CONTAINS'), node('e'),
    ])
    .return('g')

  console.log(query.interpolate())

  console.log(await query.run())

  await conn.close()
}

// main()

