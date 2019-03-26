module.exports = {
    'index':
    {
        meta: {
            showBreadcrumbs: false,
        },
        mode: 'merge'
    },
    '404':
    {
        path: '*',
        component: 'errors/page-404.vue',
        meta: {
            showBreadcrumbs: false
        }

    }

}
