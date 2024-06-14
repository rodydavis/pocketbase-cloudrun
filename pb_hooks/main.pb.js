/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/posts/:id", (c) => {
    const id = c.pathParam("id")

    const record = $app.dao().findRecordById('posts', id)

    const html = $template.loadFiles(
        `${__hooks}/views/layout.html`,
        `${__hooks}/views/post.html`,
    ).render({
        "title": record.getString("title"),
        "summary": record.getString('summary'),
        "content": record.getString('content'),
    })
    c.response().header().set("Cache-Control", "public, max-age=86400, stale-while-revalidate=3600")
    return c.html(200, html)
})

routerAdd("GET", "/posts", (c) => {
    const records = arrayOf(new Record);

    $app.dao().recordQuery("posts")
        .orderBy("updated DESC")
        .all(records)

    const html = $template.loadFiles(
        `${__hooks}/views/layout.html`,
        `${__hooks}/views/posts.html`,
    ).render({
        "posts": records.map(e => ({
            'id': e.id,
            'title': e.getString('title'),
            'summary': e.getString('summary'),
        }))
    })
    c.response().header().set("Cache-Control", "public, max-age=86400, stale-while-revalidate=3600")
    return c.html(200, html)
})

onAfterBootstrap((e) => {
    console.log("App initialized!")
})
