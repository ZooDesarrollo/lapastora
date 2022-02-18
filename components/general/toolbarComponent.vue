<template>
  <v-toolbar class="elevation-0 gd-primary-to-right">
    <v-toolbar-title class="font-weight-light white--text">
        <slot name="title"></slot>
    </v-toolbar-title>
        <v-spacer></v-spacer>
        <slot name="buttons"></slot>
  </v-toolbar>
</template>
