<template>
  <div>
  <ul>
      <li v-for="page in pages" :key="page.fields.pageTitle">
        {{ page.fields.pageTitle }}
      </li>
    </ul>
  </div>
</template>

<script>

  import {createClient} from '~/plugins/contentful.js'

  const client = createClient()
export default {
  head: {
    title: 'Welcome',
    meta: [{ hid: 'description', name: 'description', content: 'Welcome' }]
  },

   asyncData ({env}) {
      return Promise.all([

        // fetch all blog posts sorted by creation date
        client.getEntries({
          'content_type': 'pages'
        })
      ]).then(([entries]) => {
        // return data that should be available
        // in the template
        console.log(entries)
        return {
          pages: entries.items
        }
      }).catch(console.error)
    }
}
</script>
