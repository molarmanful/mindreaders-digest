let cmds = {
  help(ctx){
    ctx.winTitle = 'MANUAL'
    ctx.winContent = `\
<u>COMMANDS</u>

> help
Displays this manual.

> about
Displays a description of the Mindreader's Digest.

> list
Lists the contents of the Digest.

> read [number]
Reads the article given by the number. Type 'list' to see the available articles.

To close this window, click the 'X' in the upper right-hand corner or press 'Esc' on your keyboard.


-- END OF PAGE --`
    ctx.windowed = true
  },

  about(ctx){
    ctx.winTitle = `THE MINDREADER's DIGEST`
    ctx.winContent = `\
Welcome to the Mindreader's Digest, an odd fictional e-magazine from a hypothetical future in which thought-based communication and interaction is made possible via brain implants. The Digest explores the potential impacts that this technology may have on all aspects of society. Included are snippets of fictional articles, opinions, and artwork set within the context of this fictional future.

Designed with &hearts; by Ben Pang for CommTech Fall 2020.


-- END OF PAGE --`
    ctx.windowed = true
  },

  list(ctx){
    ctx.text += 'CONTENTS\n\n'
    ctx.text += content.map((a, i)=> `${i + 1}. ${a.title}`).join`\n`
    ctx.text += `\n\nType 'read [number]' to read each article.`
  },

  read(ctx, arg){
    if(arg){
      let parsed = arg.split(/\s+/)[0]
      if(!+parsed || +parsed < 1 || +parsed > content.length){
        ctx.text += `'${parsed}' is not a valid article number.`
      } else {
        let a = content[parsed - 1]
        ctx.winTitle = a.title
        ctx.winContent = a.content
        ctx.windowed = true
      }
    } else {
      ctx.text += `Please provide a valid article number.`
    }
  },

  hi(ctx){
    ctx.text += 'Hello.'
  },

  test(ctx){
    ctx.text += '1\n2\n3'
  },

  echo(ctx, arg){
    ctx.text += arg
  },
}

cmds['?'] = cmds.fuck = cmds.help
cmds.abt = cmds.about
cmds.ls = cmds.list
cmds.rd = cmds.read
cmds.hello = cmds.yo = cmds.hi
cmds.testing = cmds.test
