(window.webpackJsonp=window.webpackJsonp||[]).push([[38,14],{581:function(t,o,e){"use strict";e(11),e(5),e(14),e(78),e(31),e(424),e(206),e(88),e(89);var r=e(0);var n,c=e(70);o.a=(n="container",r.a.extend({name:"v-".concat(n),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(t,o){var e=o.props,data=o.data,r=o.children;data.staticClass="".concat(n," ").concat(data.staticClass||"").trim();var c=data.attrs;if(c){data.attrs={};var l=Object.keys(c).filter((function(t){if("slot"===t)return!1;var o=c[t];return t.startsWith("data-")?(data.attrs[t]=o,!1):o||"string"==typeof o}));l.length&&(data.staticClass+=" ".concat(l.join(" ")))}return e.id&&(data.domProps=data.domProps||{},data.domProps.id=e.id),t(e.tag,data,r)}})).extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,o){var e,r=o.props,data=o.data,n=o.children,l=data.attrs;return l&&(data.attrs={},e=Object.keys(l).filter((function(t){if("slot"===t)return!1;var o=l[t];return t.startsWith("data-")?(data.attrs[t]=o,!1):o||"string"==typeof o}))),r.id&&(data.domProps=data.domProps||{},data.domProps.id=r.id),t(r.tag,Object(c.a)(data,{staticClass:"container",class:Array({"container--fluid":r.fluid}).concat(e||[])}),n)}})},605:function(t,o,e){"use strict";e.r(o);e(21),e(208),e(31);var r={props:{color:{type:String,default:"transparent"}},data:function(){return{headers:[{text:"Codigo",value:"codigo"},{text:"Nombre",value:"nombre"},{text:"Precio",value:"precio_unidad"},{text:"Distribuidor",value:"distribuidor"},{text:"Acciones",value:"actions",align:"right"}],productos:[],search:{}}},created:function(){this.getProducts()},methods:{getProducts:function(){var t=this,o="";this.search.search&&(o="_where[_or][0][nombre_contains]=".concat(this.search.search,"&_where[_or][1][id_contains]=").concat(this.search.search)),console.log(o),this.$axios.get("/productos?".concat(o)).then((function(data){t.productos=data.data}))}}},n=e(77),c=e(94),l=e.n(c),d=e(408),v=e(425),h=e(421),f=e(416),m=e(713),_=e(604),x=e(192),C=e(419),V=e(582),w=e(584),P=e(64),y=e(423),component=Object(n.a)(r,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("v-card",{staticClass:"rounded-xl"},[e("v-toolbar",{attrs:{elevation:"0",color:t.color}},[e("v-toolbar-title",{staticClass:"font-weight-light",class:{"white--text":"transparent"!=t.color,"black--text":"transparent"==t.color}},[t._v("\n      Productos\n    ")]),t._v(" "),e("v-spacer"),t._v(" "),e("v-btn",{staticClass:"white--text rounded-lg font-weight-light mr-2",attrs:{color:"gd-primary-to-right"}},[t._v("\n      Escanear codigo\n        \n      "),e("v-icon",[t._v("mdi-barcode")])],1),t._v(" "),t._t("headerButtons")],2),t._v(" "),e("v-divider"),t._v(" "),e("v-card-title",[e("v-row",[e("v-col",{staticClass:"col-md-10"},[e("v-text-field",{attrs:{solo:"",dense:"",label:"Buscar producto (Nombre, Codigo)"},model:{value:t.search.search,callback:function(o){t.$set(t.search,"search",o)},expression:"search.search"}})],1),t._v(" "),e("v-col",{staticClass:"col-md-2"},[e("v-btn",{staticClass:"white--text rounded-lg font-weight-light",attrs:{block:"",color:"gd-primary-to-right"},on:{click:function(o){return t.getProducts()}}},[t._v("\n          Buscar "),e("v-icon",[t._v("mdi-magnify")])],1)],1),t._v(" "),e("v-col",{staticClass:"col-12"})],1)],1),t._v(" "),e("v-card-text",{staticClass:"mt-4 mb-4"},[e("v-card",{staticClass:"rounded-xl",attrs:{outlined:""}},[e("v-data-table",{attrs:{"hide-default-footer":"",headers:t.headers,items:t.productos},scopedSlots:t._u([{key:"item.actions",fn:function(o){var e=o.item;return[t._t("button",null,{item:e})]}}],null,!0)})],1)],1)],1)}),[],!1,null,null,null);o.default=component.exports;l()(component,{VBtn:d.a,VCard:v.a,VCardText:h.b,VCardTitle:h.c,VCol:f.a,VDataTable:m.a,VDivider:_.a,VIcon:x.a,VRow:C.a,VSpacer:V.a,VTextField:w.a,VToolbar:P.a,VToolbarTitle:y.a})},642:function(t,o,e){"use strict";e.r(o);e(21),e(208),e(11),e(5),e(164),e(69),e(31);var r={data:function(){return{search:{},products:[],product:{},headers:[{text:"Nombre",value:"nombre"},{text:"Ver historial",value:"ver_historial",align:"right"}],headersHistorial:[{text:"Fecha",value:"fecha_compra"},{text:"Precio",value:"precio_unidad"},{text:"Cantidad",value:"cantidad"},{text:"Precio total",value:"total"},{text:"Distribuidor",value:"distribuidor"}],historialProductos:[],openModalProduct:!1}},created:function(){this.getProducts()},methods:{getProducts:function(){var t=this;this.$axios.get("/productos",{params:this.search}).then((function(o){o.data.filter((function(o){if(t.products.find((function(t){return t.nombre===o.nombre})))return console.log("aca"),!1;t.products.push(o)}))}))},getHistorial:function(t){var o=this;this.openModalProduct=!0,this.$axios.get("/productos",{params:{nombre_contains:t.nombre,_sort:"fecha_compra:desc"}}).then((function(t){o.historialProductos=t.data}))},formatDate:function(t){var o=t.split("-");return"".concat(o[2],"/").concat(o[1],"/").concat(o[0])}}},n=e(77),c=e(94),l=e.n(c),d=e(408),v=e(425),h=e(421),f=e(713),m=e(578),_=e(192),x=e(644),C=e(582),V=e(584),w=e(64),P=e(423),component=Object(n.a)(r,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",[e("v-card",[e("v-card-title",[e("v-input",[e("v-text-field",{staticClass:"rounded-r-0",attrs:{placeholder:"Buscar producto",outlined:"",dense:"","hide-details":"",height:"40"},model:{value:t.search.nombre_contains,callback:function(o){t.$set(t.search,"nombre_contains",o)},expression:"search.nombre_contains"}}),t._v(" "),e("v-btn",{staticClass:"rounded-l-0",attrs:{depressed:"",height:"40",color:"primary"},on:{click:function(o){return t.getProducts()}}},[e("v-icon",[t._v("mdi-magnify")])],1)],1)],1),t._v(" "),e("v-card-text",{staticClass:"font-weight-light"},[e("v-data-table",{attrs:{headers:t.headers,items:t.products,"hide-default-footer":""},scopedSlots:t._u([{key:"item.ver_historial",fn:function(o){var r=o.item;return[e("v-btn",{attrs:{color:"primary",depressed:""},on:{click:function(o){return t.getHistorial(r)}}},[t._v("Ver historial")])]}}])})],1)],1),t._v(" "),e("v-dialog",{attrs:{persistent:""},model:{value:t.openModalProduct,callback:function(o){t.openModalProduct=o},expression:"openModalProduct"}},[e("v-card",[e("v-toolbar",{staticClass:"elevation-0",attrs:{color:"primary"}},[e("v-toolbar-title",{staticClass:"font-weight-light white--text"},[t._v("\n         Historial del producto\n        ")]),t._v(" "),e("v-spacer"),t._v(" "),e("v-btn",{staticClass:"white--text",attrs:{icon:""},on:{click:function(o){t.openModalProduct=!1}}},[e("v-icon",[t._v("mdi-close")])],1)],1),t._v(" "),e("v-card-text",[e("v-data-table",{attrs:{headers:t.headersHistorial,"hide-default-footer":"",items:t.historialProductos},scopedSlots:t._u([{key:"item.precio_unidad",fn:function(o){var e=o.item;return[t._v("\n                $ "+t._s(e.precio_unidad)+"\n            ")]}},{key:"item.total",fn:function(o){var e=o.item;return[t._v("\n                $ "+t._s(e.precio_unidad*e.cantidad)+"\n            ")]}},{key:"item.fecha_compra",fn:function(o){var e=o.item;return[t._v("\n                "+t._s(t.formatDate(e.fecha_compra))+"\n            ")]}}])})],1)],1)],1)],1)}),[],!1,null,null,null);o.default=component.exports;l()(component,{VBtn:d.a,VCard:v.a,VCardText:h.b,VCardTitle:h.c,VDataTable:f.a,VDialog:m.a,VIcon:_.a,VInput:x.a,VSpacer:C.a,VTextField:V.a,VToolbar:w.a,VToolbarTitle:P.a})},725:function(t,o,e){"use strict";e.r(o);var r={components:{HistorialProductosComponent:e(642).default},data:function(){return{openModalHistorial:!1,headers:[{text:"Codigo",value:"codigo"},{text:"Nombre",value:"nombre"},{text:"Precio",value:"precio_unidad"},{text:"Distribuidor",value:"distribuidor"},{text:"Editar",value:"editar",align:"right"}],products:[]}},created:function(){this.getProducts()},methods:{getProducts:function(){var t=this;this.$axios.get("/productos").then((function(o){t.products=o.data}))}}},n=e(77),c=e(94),l=e.n(c),d=e(408),v=e(581),h=e(578),f=e(192),m=e(582),_=e(64),x=e(423),component=Object(n.a)(r,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("v-container",{attrs:{fluid:""}},[e("ProductosListComponent",{attrs:{color:"primary"},scopedSlots:t._u([{key:"headerButtons",fn:function(){return[e("v-btn",{staticClass:"rounded-lg white--text font-weight-light",attrs:{color:"gd-primary-to-right",to:"/productos"}},[t._v("\n        Compra de mercaderia\n      ")]),t._v("\n        \n      "),e("v-btn",{staticClass:"rounded-lg white--text font-weight-light",attrs:{color:"gd-primary-to-right"},on:{click:function(o){t.openModalHistorial=!0}}},[t._v("\n        Ver historial de productos\n      ")])]},proxy:!0},{key:"button",fn:function(o){var r=o.item;return[e("v-btn",{staticClass:"rounded-lg white--text font-weight-light",attrs:{to:"/productos/editar/"+r.id,color:"gd-primary-to-right"}},[t._v("Editar")])]}}])}),t._v(" "),e("v-dialog",{attrs:{persistent:"",width:"600"},model:{value:t.openModalHistorial,callback:function(o){t.openModalHistorial=o},expression:"openModalHistorial"}},[e("v-toolbar",{staticClass:"elevation-0",attrs:{color:"primary"}},[e("v-toolbar-title",{staticClass:"font-weight-light white--text"},[t._v("\n        Historial de productos\n      ")]),t._v(" "),e("v-spacer"),t._v(" "),e("v-btn",{attrs:{icon:""},on:{click:function(o){t.openModalHistorial=!1}}},[e("v-icon",{staticClass:"font-weight-light white--text"},[t._v("mdi-close")])],1)],1),t._v(" "),e("historial-productos-component")],1)],1)}),[],!1,null,null,null);o.default=component.exports;l()(component,{ProductosListComponent:e(605).default}),l()(component,{VBtn:d.a,VContainer:v.a,VDialog:h.a,VIcon:f.a,VSpacer:m.a,VToolbar:_.a,VToolbarTitle:x.a})}}]);