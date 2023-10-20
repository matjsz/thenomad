import { Extension, textInputRule } from '@tiptap/core'

export const SmilieReplacer = Extension.create({
  name: 'smilieReplacer',

  addInputRules() {
    return [
      textInputRule({ find: /-___- $/, replace: '😑 ' }),
      textInputRule({ find: /:'-\) $/, replace: '😂 ' }),
      textInputRule({ find: /:lol: $/, replace: '😂 ' }),
      textInputRule({ find: /:lmao: $/, replace: '😂 ' }),
      textInputRule({ find: /:rofl: $/, replace: '😂 ' }),
      textInputRule({ find: /:lmfao: $/, replace: '😂 ' }),
      textInputRule({ find: /:laughing: $/, replace: '😂 ' }),
      textInputRule({ find: /:laugh: $/, replace: '😂 ' }),
      textInputRule({ find: /':-\) $/, replace: '😅 ' }),
      textInputRule({ find: /':-D $/, replace: '😅 ' }),
      textInputRule({ find: /':D $/, replace: '😅 ' }),
      textInputRule({ find: /:sweaty: $/, replace: '😅 ' }),
      textInputRule({ find: />:-\) $/, replace: '😆 ' }),
      textInputRule({ find: /XD $/, replace: '😆 ' }),
      textInputRule({ find: /xD $/, replace: '😆 ' }),
      textInputRule({ find: /-__- $/, replace: '😑 ' }),
      textInputRule({ find: /':-\( $/, replace: '😓 ' }),
      textInputRule({ find: /:worried: $/, replace: '😓 ' }),
      textInputRule({ find: /:tired: $/, replace: '😓 ' }),
      textInputRule({ find: /:'-\( $/, replace: '😢 ' }),
      textInputRule({ find: /:crying: $/, replace: '😢 ' }),
      textInputRule({ find: /:cry: $/, replace: '😢 ' }),
      textInputRule({ find: />:-\( $/, replace: '😠 ' }),
      textInputRule({ find: /:angry: $/, replace: '😠 ' }),
      textInputRule({ find: /:angel: $/, replace: '😇 ' }),
      textInputRule({ find: /0:-3 $/, replace: '😇 ' }),
      textInputRule({ find: /0:-\) $/, replace: '😇 ' }),
      textInputRule({ find: /0;\^\) $/, replace: '😇 ' }),
      textInputRule({ find: /O;-\) $/, replace: '😇 ' }),
      textInputRule({ find: /0;-\) $/, replace: '😇 ' }),
      textInputRule({ find: /O:-3 $/, replace: '😇 ' }),
      textInputRule({ find: /:'\) $/, replace: '😂 ' }),
      textInputRule({ find: /:-D $/, replace: '😃 ' }),
      textInputRule({ find: /':\) $/, replace: '😅 ' }),
      textInputRule({ find: /'=\) $/, replace: '😅 ' }),
      textInputRule({ find: /':D $/, replace: '😅 ' }),
      textInputRule({ find: /'=D $/, replace: '😅 ' }),
      textInputRule({ find: />:\) $/, replace: '😆 ' }),
      textInputRule({ find: />;\) $/, replace: '😆 ' }),
      textInputRule({ find: />=\) $/, replace: '😆 ' }),
      textInputRule({ find: /;-\) $/, replace: '😉 ' }),
      textInputRule({ find: /\*-\) $/, replace: '😉 ' }),
      textInputRule({ find: /;-\] $/, replace: '😉 ' }),
      textInputRule({ find: /:blink: $/, replace: '😉 ' }),
      textInputRule({ find: /;\^\) $/, replace: '😉 ' }),
      textInputRule({ find: /B-\) $/, replace: '😎 ' }),
      textInputRule({ find: /8-\) $/, replace: '😎 ' }),
      textInputRule({ find: /B-D $/, replace: '😎 ' }),
      textInputRule({ find: /8-D $/, replace: '😎 ' }),
      textInputRule({ find: /:cool: $/, replace: '😎 ' }),
      textInputRule({ find: /:-\* $/, replace: '😘 ' }),
      textInputRule({ find: /:\^\* $/, replace: '😘 ' }),
      textInputRule({ find: /:kiss: $/, replace: '😘 ' }),
      textInputRule({ find: /:-\) $/, replace: '🙂 ' }),
      textInputRule({ find: /:happy: $/, replace: '🙂 ' }),
      textInputRule({ find: /-_- $/, replace: '😑 ' }),
      textInputRule({ find: /:-X $/, replace: '😶 ' }),
      textInputRule({ find: /:quiet: $/, replace: '😶 ' }),
      textInputRule({ find: /:-# $/, replace: '😶 ' }),
      textInputRule({ find: /:-x $/, replace: '😶 ' }),
      textInputRule({ find: />.< $/, replace: '😣 ' }),
      textInputRule({ find: /:worried: $/, replace: '😣 ' }),
      textInputRule({ find: /:-O $/, replace: '😮 ' }),
      textInputRule({ find: /:o $/, replace: '😮 ' }),
      textInputRule({ find: /:O $/, replace: '😮 ' }),
      textInputRule({ find: /:surprised: $/, replace: '😮 ' }),
      textInputRule({ find: /:-o $/, replace: '😮 ' }),
      textInputRule({ find: /O_O $/, replace: '😮 ' }),
      textInputRule({ find: />:O $/, replace: '😮 ' }),
      textInputRule({ find: /:-P $/, replace: '😛 ' }),
      textInputRule({ find: /:-p $/, replace: '😛 ' }),
      textInputRule({ find: /:-Þ $/, replace: '😛 ' }),
      textInputRule({ find: /:-þ $/, replace: '😛 ' }),
      textInputRule({ find: /:-b $/, replace: '😛 ' }),
      textInputRule({ find: />:P $/, replace: '😜 ' }),
      textInputRule({ find: /X-P $/, replace: '😜 ' }),
      textInputRule({ find: /x-p $/, replace: '😜 ' }),
      textInputRule({ find: /:crazy: $/, replace: '😜 ' }),
      textInputRule({ find: /':\( $/, replace: '😓 ' }),
      textInputRule({ find: /'=\( $/, replace: '😓 ' }),
      textInputRule({ find: />:\\ $/, replace: '😕 ' }),
      textInputRule({ find: />:\/ $/, replace: '😕 ' }),
      textInputRule({ find: /:-\/ $/, replace: '😕 ' }),
      textInputRule({ find: /:-. $/, replace: '😕 ' }),
      textInputRule({ find: />:\[ $/, replace: '😞 ' }),
      textInputRule({ find: /:-\( $/, replace: '😞 ' }),
      textInputRule({ find: /:-\[ $/, replace: '😞 ' }),
      textInputRule({ find: /:'\( $/, replace: '😢 ' }),
      textInputRule({ find: /;-\( $/, replace: '😢 ' }),
      textInputRule({ find: /#-\) $/, replace: '😵 ' }),
      textInputRule({ find: /%-\) $/, replace: '😵 ' }),
      textInputRule({ find: /X-\) $/, replace: '😵 ' }),
      textInputRule({ find: />:\( $/, replace: '😠 ' }),
      textInputRule({ find: /0:3 $/, replace: '😇 ' }),
      textInputRule({ find: /0:\) $/, replace: '😇 ' }),
      textInputRule({ find: /O:\) $/, replace: '😇 ' }),
      textInputRule({ find: /O=\) $/, replace: '😇 ' }),
      textInputRule({ find: /O:3 $/, replace: '😇 ' }),
      textInputRule({ find: /<\/3 $/, replace: '💔 ' }),
      textInputRule({ find: /:D $/, replace: '😃 ' }),
      textInputRule({ find: /=D $/, replace: '😃 ' }),
      textInputRule({ find: /;\) $/, replace: '😉 ' }),
      textInputRule({ find: /\*\) $/, replace: '😉 ' }),
      textInputRule({ find: /;\] $/, replace: '😉 ' }),
      textInputRule({ find: /;D $/, replace: '😉 ' }),
      textInputRule({ find: /B\) $/, replace: '😎 ' }),
      textInputRule({ find: /8\) $/, replace: '😎 ' }),
      textInputRule({ find: /:\* $/, replace: '😘 ' }),
      textInputRule({ find: /=\* $/, replace: '😘 ' }),
      textInputRule({ find: /:\) $/, replace: '🙂 ' }),
      textInputRule({ find: /=\] $/, replace: '🙂 ' }),
      textInputRule({ find: /=\) $/, replace: '🙂 ' }),
      textInputRule({ find: /:\] $/, replace: '🙂 ' }),
      textInputRule({ find: /:X $/, replace: '😶 ' }),
      textInputRule({ find: /:# $/, replace: '😶 ' }),
      textInputRule({ find: /=X $/, replace: '😶 ' }),
      textInputRule({ find: /=x $/, replace: '😶 ' }),
      textInputRule({ find: /:x $/, replace: '😶 ' }),
      textInputRule({ find: /=# $/, replace: '😶 ' }),
      textInputRule({ find: /:O $/, replace: '😮 ' }),
      textInputRule({ find: /:o $/, replace: '😮 ' }),
      textInputRule({ find: /:P $/, replace: '😛 ' }),
      textInputRule({ find: /=P $/, replace: '😛 ' }),
      textInputRule({ find: /:p $/, replace: '😛  ' }),
      textInputRule({ find: /=p $/, replace: '😛 ' }),
      textInputRule({ find: /:Þ $/, replace: '😛 ' }),
      textInputRule({ find: /:þ $/, replace: '😛 ' }),
      textInputRule({ find: /:b $/, replace: '😛 ' }),
      textInputRule({ find: /d: $/, replace: '😛 ' }),
      textInputRule({ find: /:\/ $/, replace: '😕 ' }),
      textInputRule({ find: /:\\ $/, replace: '😕 ' }),
      textInputRule({ find: /=\/ $/, replace: '😕 ' }),
      textInputRule({ find: /=\\ $/, replace: '😕 ' }),
      textInputRule({ find: /:L $/, replace: '😕 ' }),
      textInputRule({ find: /=L $/, replace: '😕 ' }),
      textInputRule({ find: /:\( $/, replace: '😞 ' }),
      textInputRule({ find: /:\[ $/, replace: '😞 ' }),
      textInputRule({ find: /=\( $/, replace: '😞 ' }),
      textInputRule({ find: /;\( $/, replace: '😢 ' }),
      textInputRule({ find: /D: $/, replace: '😨 ' }),
      textInputRule({ find: /:\$ $/, replace: '😳 ' }),
      textInputRule({ find: /:shame: $/, replace: '😳 ' }),
      textInputRule({ find: /=\$ $/, replace: '😳 ' }),
      textInputRule({ find: /#\) $/, replace: '😵 ' }),
      textInputRule({ find: /%\) $/, replace: '😵 ' }),
      textInputRule({ find: /X\) $/, replace: '😵 ' }),
      textInputRule({ find: /:dizzy: $/, replace: '😵 ' }),
      textInputRule({ find: /:@ $/, replace: '😠 ' }),
      textInputRule({ find: /<3 $/, replace: '❤️ ' }),
      textInputRule({ find: /\/shrug $/, replace: '¯\\_(ツ)_/¯' }),
    ]
  },
})