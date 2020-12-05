const Shell = {
  data(){
    return {
      text: `MINDREADER's DIGEST\nv0.0.1\nType 'help' for a list of commands.\n\n`,
      windowed: false,
      confirm: false,
      unlocked: false,
      winTitle: '',
      winContent: ''
    }
  },
  mounted(){
    shell.classList.remove('unloaded')
    this.focusCmd()

    addEventListener('keyup', e=>{
      if(e.key == 'Escape') this.winClose()
    })
  },

  methods: {

    focusCmd(){
      this.$refs.cmd.focus()
    },

    bottom(){
      this.$el.scrollTop = this.$el.scrollHeight
    },

    submit(){
      let command = this.$refs.cmd.value
      this.text += `> ${command}\n`
      this.interpret(this, command)
      this.$refs.cmd.value = ''
    },

    interpret(ctx, cmd){
      let parsed = cmd.replace(/^\s+/, '').split(/\s+(.*)/)
      if(parsed[0]){
        let query = parsed[0].toLowerCase()
        if(cmds[query]){
          cmds[query](ctx, parsed[1])
        } else {
          this.text += `Command '${query}' not found. Type 'help' for a list of commands.`
        }
      }

      this.text += '\n'
    },

    winClose(){
      this.windowed = false
      Vue.nextTick(_=>{
        this.focusCmd()
      })
    },

  }
}

Vue.createApp(Shell).mount('#shell')
