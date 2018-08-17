<template>
  <div class="books">
    <v-snackbar v-model="snackbar" top="top" :color="snackbarColor">
      {{ snackbarText }}
      <v-btn
        color="write"
        flat
        @click="snackbar = false"
      >
        Fechar
      </v-btn>
    </v-snackbar>
    <v-toolbar flat>
      <v-toolbar-title>Livros</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Cadastrar Livro</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.Titulo" :rules="[rules.required]" label="Título"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.Autor" label="Autor" :rules="[rules.required]"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.Ano" mask="####" label="Ano" :rules="[rules.required]"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.Edicao" label="Edição" :rules="[rules.required]"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="books"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.titulo }}</td>
        <td>{{ props.item.autor }}</td>
        <td>{{ props.item.ano }}</td>
        <td>{{ props.item.edicao }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import Api from '@/Api'

  export default {
    data: () => ({
      dialog: false,
      snackbar: false,
      snackbarText: '',
      snackbarColor: 'info',
      rules: {
        required: value => !!value || 'Campo Obrigatório.'
      },
      headers: [
        {
          text: '#',
          value: 'id'
        },
        {
          text: 'Título',
          value: 'titulo',
          sortable: false
        },
        {
          text: 'Autor',
          value: 'autor',
          sortable: false
        },
        {
          text: 'Ano',
          value: 'ano',
          sortable: true
        },
        {
          text: 'Edição',
          value: 'edicao',
          sortable: false
        }
      ],
      books: [],
      editedIndex: -1,
      editedItem: {
        Titulo: '',
        Autor: '',
        Ano: 2018,
        Edicao: ''
      },
      defaultItem: {
        Titulo: '',
        Autor: '',
        Ano: 2018,
        Edicao: ''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Livro' : 'Editar Livro'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        Api
          .get('livros')
          .then((books) => (this.books = books))
          .catch((e) => console.error(e))
      },

      editItem (item) {
        this.editedIndex = this.books.indexOf(item)
        this.editedItem = {
          Titulo: item.titulo,
          Autor: item.autor,
          Ano: item.ano,
          Edicao: item.edicao,
          Id: item.id
        }
        this.dialog = true
      },

      deleteItem (item) {
        Api
          .delete(`livros/${item.id}`)
          .then((response) => {
            this.snackbar = true
            this.snackbarText = 'Livro deletado com sucesso!'
            this.snackbarColor = 'success'
            this.initialize()
          })
          .catch((e) => console.error(e))
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      validateForm (item) {
        if (!item.Titulo) return false
        if (!item.Autor) return false
        if (!item.Ano) return false
        if (!item.Edicao) return false
        return true
      },

      save () {
        if (this.validateForm(this.editedItem)) {
          if (this.editedIndex > -1) {
            Api
              .put(`livros/${this.editedItem.Id}`, this.editedItem)
              .then((response) => {
                this.snackbar = true
                this.snackbarText = response.mensagem
                this.snackbarColor = 'success'
                this.initialize()
              })
              .catch((e) => console.error(e))
          } else {
            Api
              .post('livros', this.editedItem)
              .then((response) => {
                this.snackbar = true
                this.snackbarText = response.mensagem
                this.snackbarColor = 'success'
                this.initialize()
              })
              .catch((e) => console.error(e))
          }
          this.close()
        } else {
          this.snackbar = true
          this.snackbarText = 'Todos os campos são obrigatórios'
          this.snackbarColor = 'error'
        }
      }
    }
  }
</script>

<style scoped>

</style>


