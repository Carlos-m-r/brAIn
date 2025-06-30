
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/brAIn/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/brAIn/chat",
    "route": "/brAIn"
  },
  {
    "renderMode": 2,
    "route": "/brAIn/chat"
  },
  {
    "renderMode": 2,
    "redirectTo": "/brAIn/chat",
    "route": "/brAIn/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1131, hash: 'f7637b196ec007b2996e24579d65504b931873dcc07168c41ed6144bd7cb701c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1059, hash: '1013765f9ae151f3159a4aaf94f1fcc640e67447be1065091ed023f2b7a4203a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'chat/index.html': {size: 72041, hash: '0856bfa017abb84781101de2b56e5f580693ec214bfeebe2284588ddd7376804', text: () => import('./assets-chunks/chat_index_html.mjs').then(m => m.default)},
    'styles-XRLICAUY.css': {size: 15343, hash: 'klPysg6h6CE', text: () => import('./assets-chunks/styles-XRLICAUY_css.mjs').then(m => m.default)}
  },
};
