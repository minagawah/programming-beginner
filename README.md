# programming-beginner

A tutorial on implementing server and client apps using NodeJS.


## 1. 基礎知識

### 1-1. CLI コマンドの使い方

- CLI とは？
  - Command Line Interface
  - つまり Git Bash などのターミナルのように、コマンドで操作するソフトのこと.
  - その一方で、マウスを動かしたり、クリックしたりして操作するような、一般人が使うソフトは GUI (Graphical User Interface) と呼ばれる.
- `pwd`
  - 今いる場所を確かめる
- `ls -la`
  - 現在のフォルダのファイルやディレクトリを一覧表示する
- `ls -la ./shops`
  - shops フォルダの中身の一覧表示する
- `ls -la ./shops/202312`
  - shops/202312 フォルダの中身の一覧表示する
- `ls -la ./shops/2 [Tab]`
  - `2` まで打って Tab を押すと `202312` を補完してくれる.
- `ls -la ../../company`
  - ２つ上の company フォルダを一覧表示する
- コマンドラインにおける操作一覧:
  - Ctrl-A ... そのラインの先頭に飛ぶ (alpha)
  - Ctrl-E ... そのラインの最後に飛ぶ (end)
  - Ctrl-F ... 一回押すごとに一文字ずつ前に進む (forward)
  - Ctrl-B ... 一回押すごとに一文字ずつ後ろに進む (back)
  - Ctrl-D ... 一回押すごとに次の文字を一つ文字ずつ消す (delete)
  - Ctrl-K ... そっから先の文字をすべて消す (kill)
  - Ctrl-Y ... 消した文字すべてを貼り付ける (yank)
  - Ctrl-R ... 以前に打ったコマンドの履歴を次々に表示してくれる
- `cp test.txt text2.txt`
  - ファイルをコピーする
- `mv test.txt text2.txt`
  - ファイル名を text2.txt に変更する
- `mv test.txt shop/`
  - test.txt を shop フォルダに移動する
- `cat test.txt`
  - test.txt の中身を表示する
- `atom .`
  - 現在のフォルダで Atom エディターを開く

### 1-2. NodeJS 関連の知識

- NodeJS
  - JS で書いたプログラムを理解し、実行してくれるアプリケーション.
  - Chrome ブラウザには V8 エンジンというものが搭載されており、例えば Chrome ブラウザでどこかのウェブサイトを訪れると、そこに置いてある JS のプログラムを解析し、実行してくれる. NodeJS もおなじく V8 エンジンを採用している. だからサーバに置いてある JS で書かれたアプリケーションは、ブラウザがなくても、NodeJS で実行すればこれを動かすことができる.
  - 使い方:
    - `node ./sample.js` (書いた JS プログラムを実行する)
    - `node -v` (バージョンを調べる)
- nvm
  - NodeJS Version Manager の略
  - パソコンに NodeJS を直接インストールしてもよいが、それだとバージョンが固定されてしまう.
  - 作業するプロジェクトによって NodeJS のバージョンを変えたいということが多々ある. このとき nvm で NodeJS を管理していれば随時バージョンを変えることができる.
  - これは JS だけでなく、他の言語でも似たようなものがあり、JS の場合は nvm を使うのが一般的.
  - 使い方:
    - `nvm ls` (現在インストールしている NodeJS の一覧を表示する)
    - `nvm install v18.12.0` (NodeJS v18.12.0 をインストールする)
    - `nvm use v18.12.0` (インストールした v18.12.0 を現在のフォルダに限って使うようにする)
    - `nvm current` (現在のフォルダで使われているバージョンを知る)
- npm
  - NodeJS Package Manager の略
  - 誰かが書いたライブラリを JS では「パッケージ」とか「モジュール」と呼ぶ.
  - それらをプロジェクトにインストールし、管理するのが npm である.
  - パッケージ・マネージャは他にもあるが、今のところは npm でよい.
  - 使い方:
    - `npm install --save ramda`  
例) ramda というパッケージをインストールする  
このコマンドには `--save` が付いているので、インストールすると `package.json` の `dependencies` の項目に `ramda` が追加されていることが分かる.
    - `npm -v` (バージョンを調べる)

## 2. このプロジェクトを動かしてみる

プロジェクトを clone する

```
git clone https://github.com/minagawah/programming-beginner.git
cd programming-beginner
ls -la
```

`server` のほうに NPM パッケージをインストールする  
(注・実際は nvm を使って NodeJS と NPM のバージョンを上げる作業が発生したがこれについては割愛する)

```
cd server
npm install
```

すると以下の２つが出現することが分かる

- `node_modules` フォルダ
- `package-lock.json` ファイル

逆にいえば、もし新しいフォルダに、新しいプロジェクトを作り、ソースをすべてコピーしたいと思った場合、**この２つにはコピーしないものである、** ということが分かる.

```
npm run watch
```

これを打つと、サーバが起動し、[views](server/views) フォルダと [styles](server/styles) フォルダを常に nodemon が監視することになる.

サーバを停止したいときは `Ctrl-C` (Control キーを押しながら C) を押す.  
(これはどんなコマンドを停止するときもおなじ)

## 3. 仕組み

### 3-1. Server

- [bin/www](server/bin/www)
  - 本体は [app.js](server/app.js) だが以下３つのことをやっている:
    - http://localhost:3000 のように `:` のあとの番号を「ポート番号」というが、ポート番号の指定がない場合は 3000 ポートを使うようにしている.
    - エラーのときの処理を `onError` に定義している.
    - 成功のときの処理を `onListening` に定義している.
  - いずれにしても `app` を読み込んで、それでサーバを起動する処理をしている.
  - 呼び出すときは `node ./bin/www` になる.
  - ただし [package.json](server/package.json) の中身をみると  
`"watch:www": "nodemon -x node ./bin/www -e html,njk,js,txt -w '*.js' -w views"`  
と書いてある. つまり nodemon を使って [views](server/views) フォルダのなかにある HTML ファイルが書き換わったかどうかを監視している.  
HTML ファイルが書き換わると nodemon は `node ./bin/www` を中止し、再度 `node ./bin/www` する.
すなわちサーバを停止し、サーバを再び立ち上げることになる.
  - これを呼び出すのであれば `npm run watch:www` というコマンドになる.
- [styles](server/styles)
  - 中には [main.css](server/styles/main.css) が置いてあるだけ.
  - [package.json](server/package.json) の中身をみると  
`"build:css": "postcss styles --dir public/css"`  
と書いてある. postcss というプログラムを実行していることが分かる.
  - [styles](server/styles) フォルダの中にある CSS ファイルたちを処理し、`public/css` フォルダに吐き出すようにという指示が書いてある.
  - どのような処理をさせたいのかが [postcss.config.js](server/postcss.config.js) に書いてある.
  - 更に [package.json](server/package.json) の中身をみると  
`"watch:css": "nodemon -x $npm_execpath run build:css -e css,html,njk -w styles -w views"`  
と書いてある. サーバのときと同様に nodemon を使って [styles](server/styles) フォルダと [views](server/views) フォルダの中身が書き換わったかどうかを監視しているということが分かる. それらの CSS ファイルを書き換えてみると、もう一度、postcss が動き、[styles](server/styles) フォルダの中にある CSS フォルダが `public/css` に吐き出されるのが分かる.
- [postcss.config.js](server/postcss.config.js)
  - postcss が実行されたときに最初に読み込まれる設定ファイル.
  - 中をみると、色んなプラグインを使え、という指示が書いてあるのが分かる.
  - 注目すべきは autoplefixer プラグインである.
  - [styles/main.css](server/styles/main.css) に書いた CSS スタイルは、Chrome や Firefox や Edge などで書式が異なることがある.
  - autoplefixer プラグインは、あらゆる書式に翻訳してくれるもの.
- [app.js](server/app.js)
  - Express という NodeJS で最も使われているフレームワークで何をやらせたいかを書いておくファイル.
  - 中身はほとんど Express のサイトに紹介されている例をコピペしたものに過ぎない.
  - 唯一 nunjucks をテンプレート・エンジンに指定している点で違うだけ.
  - [app.js](server/app.js) の中身をみると `nunjucks.configure('views', {OPTIONS})` のように nunjucks が指定されており、つまり `views` フォルダにすべてのテンプレートを置くようにしたい、と nunjucks に伝えているのである.
  - また次のような記述もある  
`app.use(express.static(path.resolve(__dirname, 'public')))`  
これは static (静的) なアセットをすべて `public` フォルダに置きたいということを Express に伝えているのである.
  - 外資系の会社だと "アセット (assets)" と呼ぶことが多い.  
国内の会社だと 'リソース (resources)" と表現tすることが多い.
  - 静的なアセットのメジャーなものは以下の３つ:
    - JS
    - CSS
    - images (画像)
- [public](server/public)
  - このフォルダは静的アセットを置く場所であることを、すでに [app.js](server/app.js) で定義した.
  - 何もプログラムを実行しない状態だと [public/images](server/public/images) フォルダが置いてあるだけ.
  - `npm run build:css` oや `npm run watch:css` を動かすと `public/css` フォルダが出現することが分かる.
  - ちなみに [client](client) で JS のビルドを行うと、さらに `public/js` フォルダがここに出現する.

### 3-2. Client

まだ

